---
emoji: A␖c
title: Async rust
description: Async Rust and performance benefits.
date: 2025-08-10
layout: base
---


Asynchronous programming is a powerful paradigm for building highly concurrent and efficient I/O-bound applications. 

I will dissect the core components of Rust's asynchrony, from the fundamental `Future` trait to the complexities of `Pin` and memory management. We will then unravel the inner workings of Tokio, the most popular async runtime, exploring its scheduler, I/O handling with `mio`, and how it all comes together to execute our asynchronous code.

### The `Future` Trait

At the absolute core of async Rust lies the `std::future::Future` trait. A `Future` is a value that represents a computation that may not have completed yet. Think of it as a placeholder for a result that will be available at some point in the future. Futures in Rust are lazy; they don't do anything until they are actively driven to completion.

The `Future` trait has a single required method, `poll`:

```rust
pub trait Future {
    type Output;
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
```



*   **`self: Pin<&mut Self>`**: This is a pinned mutable reference to the future itself. We'll go into detail about `Pin` later, but for now, know that it's a mechanism to prevent the future from being moved in memory. This is crucial because many futures are self-referential, meaning they store pointers to their own data.
*   **`cx: &mut Context<'_>`**: This is the task context, which provides access to a `Waker`. The `Waker` is a handle that allows the future to signal to the executor that it's ready to make progress.
*   **`Poll<Self::Output>`**: The `poll` method returns an enum called `Poll`, which can be in one of two states:
    *   `Poll::Ready(value)`: The future has completed, and `value` is the resulting `Output`.
    *   `Poll::Pending`: The future is not yet able to complete. When a future returns `Pending`, it must ensure that it has registered the `Waker` from the `Context` to be notified when it's ready to be polled again.

This "waker contract" is fundamental to how async Rust works without wasting CPU cycles. Instead of continuously polling a future in a tight loop, the executor can park the task and wait to be woken up when the future is ready to advance.

To illustrate, here's a conceptual implementation of a simple timer future:

```rust
use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll, Waker};
use std::thread;
use std::time::Duration;

pub struct TimerFuture {
    duration: Duration,
    waker: Option<Waker>,
}

impl Future for TimerFuture {
    type Output = ();

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        if self.duration.as_secs() == 0 {
            Poll::Ready(())
        } else {
            // Store the waker to be called when the timer is done.
            self.waker = Some(cx.waker().clone());
            let waker = self.waker.clone().unwrap();
            let duration = self.duration;

            thread::spawn(move || {
                thread::sleep(duration);
                waker.wake();
            });

            Poll::Pending
        }
    }
}
```

### The Magic of `async/await`

Writing manual `Future` implementations can be cumbersome. This is where `async/await` comes in as a high-level, ergonomic syntax. An `async fn` is essentially syntactic sugar for a function that returns a type implementing `Future`.

When the compiler encounters an `async` block, it performs a remarkable transformation: it rewrites the block into a state machine. Each `.await` point in the function becomes a potential suspension point, which corresponds to a state in the machine. The local variables that need to persist across these `.await` points are stored as fields within the generated state machine struct.

Consider this simple `async` function:

```rust
async fn read_and_write() {
    let data = read_from_socket().await;
    write_to_socket(data).await;
}
```

Conceptually, the compiler generates a struct that looks something like this:

```rust
enum ReadAndWriteState {
    Start,
    WaitingOnRead,
    WaitingOnWrite,
    Done,
}

struct ReadAndWriteFuture {
    state: ReadAndWriteState,
    data: Option<Vec<u8>>,
    // ... other fields for the futures of read_from_socket and write_to_socket
}

impl Future for ReadAndWriteFuture {
    type Output = ();

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        loop {
            match self.state {
                ReadAndWriteState::Start => {
                    // Start polling the read_from_socket future
                    // ...
                    self.state = ReadAndWriteState::WaitingOnRead;
                }
                ReadAndWriteState::WaitingOnRead => {
                    // Poll the read_from_socket future
                    // If it's Ready(data), store it and move to the next state
                    // If it's Pending, return Pending
                    // ...
                }
                ReadAndWriteState::WaitingOnWrite => {
                    // Poll the write_to_socket future
                    // If it's Ready, move to the Done state
                    // If it's Pending, return Pending
                    // ...
                }
                ReadAndWriteState::Done => {
                    return Poll::Ready(());
                }
            }
        }
    }
}
```

This state machine structure is why `async` functions can be self-referential—the generated struct holds both the state and the data that lives across suspension points.

### The Necessity of `Pin`

The self-referential nature of `async` state machines introduces a significant challenge: memory safety. If we could move a `Future` in memory (for example, by moving it from the stack to the heap), any internal pointers within that `Future` would become invalid, leading to dangling pointers and undefined behavior.

This is where `Pin` comes to the rescue. `Pin` is a smart pointer that "pins" its data to a specific memory location, preventing it from being moved. It does this by restricting how you can get a mutable reference to the data. You can only get a `&mut T` from a `Pin<&mut T>` if `T` implements the `Unpin` trait.

`Unpin` is an auto-trait implemented by default for most types in Rust. It signifies that a type is safe to be moved even when it is "pinned." However, the state machines generated by `async` blocks are *not* `Unpin`.

By taking `self: Pin<&mut Self>`, the `poll` method guarantees that the `Future`'s memory location is stable, allowing for safe polling of self-referential futures. The `pin-project` crate is a commonly used tool that helps safely create projections from a pinned struct to its fields.

### The Engine: The Tokio Runtime

As mentioned earlier, `Future`s are inert until they are polled by an executor. An executor is responsible for managing a set of top-level futures (or "tasks") and polling them until they complete. Tokio is the most widely-used, production-ready async runtime in the Rust ecosystem.

A Tokio runtime bundles several key components:

*   **Task Scheduler**: Decides which tasks to run and when.
*   **I/O Driver (Reactor)**: Interacts with the operating system's event notification system (like epoll on Linux, kqueue on macOS, and IOCP on Windows) to handle asynchronous I/O operations.
*   **Timer**: Provides functionality for tasks that need to execute at a specific time or after a certain duration.

When you use the `#[tokio::main]` macro, you are starting a Tokio runtime and spawning your `main` function as the first task.

```rust
#[tokio::main]
async fn main() {
    println!("Hello from async main!");
}
```

### Tokio's Multi-Threaded Scheduler

To leverage modern multi-core processors, Tokio provides a powerful multi-threaded scheduler that employs a work-stealing strategy. This scheduler operates on an M:N threading model, where a large number of user-space tasks (the "M") are multiplexed onto a smaller number of OS threads (the "N").

Here's how it works:

1.  **Worker Threads**: The runtime spawns a pool of worker threads, typically one for each CPU core.
2.  **Local Run Queues**: Each worker thread maintains its own local queue of tasks that are ready to be polled.
3.  **Work-Stealing**: When a worker thread runs out of tasks in its local queue, it doesn't just go to sleep. Instead, it will attempt to "steal" tasks from the local queues of other worker threads.

This work-stealing approach offers excellent load balancing and high CPU utilization. If one worker is busy with a long-running task, other idle workers can pick up pending tasks from its queue, ensuring that the system remains responsive.

For workloads that don't require parallelism or to avoid the overhead of synchronization, Tokio also offers a single-threaded runtime. For CPU-bound or blocking operations that would otherwise stall a worker thread, Tokio provides `tokio::task::spawn_blocking`, which moves the blocking task to a dedicated thread pool, preventing it from halting the progress of other async tasks.

### Under the Hood of I/O: `mio`

Tokio doesn't communicate with the operating system's I/O APIs directly. Instead, it relies on a lower-level library called `mio` (Metal I/O). `mio` is a fast, low-level I/O library that provides a cross-platform, non-blocking API for building high-performance I/O applications.

`mio`'s core purpose is to provide an abstraction over the OS's event notification systems like `epoll`, `kqueue`, and `IOCP`. The basic workflow involves:

1.  Creating a `Poll` instance, which represents the system's event queue.
2.  Registering event sources (like TCP sockets) with the `Poll` instance, specifying the readiness events you're interested in (e.g., readable or writable).
3.  Calling `poll()` in a loop to wait for events from the OS.

Tokio's I/O driver, often called the "reactor," is built on top of `mio`. When a future needs to perform an I/O operation (like reading from a `TcpStream`), it doesn't block. Instead, it registers its interest in a readiness event with the reactor and returns `Poll::Pending`. The reactor, using `mio`, waits for the OS to signal that the socket is now readable. Once the event arrives, the reactor looks up the `Waker` for the task associated with that I/O resource and calls `wake()`. This tells the scheduler to queue the task for polling again.


Of course, here is the new section that was added to the blog post.

***

### The `move` Keyword and Async Closures:

The interplay between closures and asynchronous tasks introduces important considerations around variable lifetimes, making the `move` keyword a crucial tool. This is most apparent when spawning new tasks with `tokio::spawn`.

The `tokio::spawn` function takes a future and executes it concurrently. A critical constraint is that this future must be `'static`. This means the future cannot hold any non-static references. The compiler enforces this because the spawned task might outlive the function that created it. If the task held a reference to a local variable in the spawner's stack frame, and that function returned, the task would be left with a dangling pointer, leading to undefined behavior.

Consider this scenario:

```rust
async fn my_async_fn() {
    let my_data = String::from("some important data");

    tokio::spawn(async {
        // We want to use my_data here
        println!("{}", my_data);
    });
}
```

Without the `move` keyword before the `async` block, this code will fail to compile. By default, the closure will try to capture `my_data` by reference. The compiler sees that the reference to `my_data` has a lifetime tied to the `my_async_fn` function, while the spawned task must be `'static`. This creates a lifetime mismatch.

The error message would look something like this:
```
error: `my_data` does not live long enough
  --> src/main.rs:5:24
   |
5  |       tokio::spawn(async {
   |  ____________________^
6  | |         println!("{}", my_data);
7  | |     });
   | |_____^ returning this value requires that `my_data` is borrowed for `'static`
...
10 | }
   | - `my_data` dropped here while still borrowed
```

To solve this, we use a `move` closure:

```rust
async fn my_async_fn() {
    let my_data = String::from("some important data");

    tokio::spawn(async move { // Note the 'move' keyword
        println!("{}", my_data);
    });
}
```

The `move` keyword forces the closure to take ownership of the captured variables. In this case, `my_data` is *moved* into the `async` block's future. The future now owns the `String`, and since `String` itself is `'static` (it doesn't contain any non-static references), the future as a whole satisfies the `'static` bound required by `tokio::spawn`.

It's important to understand that `move` transfers ownership. After the `tokio::spawn`, you can no longer use `my_data` in `my_async_fn` because it has been moved. If you need to use the data in multiple tasks or continue using it in the parent function, you must use a shared ownership mechanism like `Arc` (Atomically Reference-Counted smart pointer).

```rust
use std::sync::Arc;

async fn my_async_fn_shared() {
    let my_data = Arc::new(String::from("shared data"));

    for i in 0..2 {
        let data_clone = Arc::clone(&my_data);
        tokio::spawn(async move {
            println!("Task {}: {}", i, data_clone);
        });
    }

    println!("Original data still accessible: {}", my_data);
}
```
In this example, we clone the `Arc`, which just increments a reference counter, and move the clone into the spawned task. This is a cheap operation that allows multiple tasks to safely share ownership of the same data without violating Rust's lifetime rules.

### Putting It All Together: A Request's Journey

tracing the lifecycle of an asynchronous network request in a web server built with Tokio to see how all these pieces fit together.

1.  **Connection Arrives**: A `TcpListener` (from Tokio's `net` module) is asynchronously waiting for incoming connections.
2.  **Task Spawning**: When a connection is accepted, the server spawns a new async task to handle the request. This task is submitted to Tokio's scheduler and placed in a worker's local run queue.
3.  **First Poll**: A worker thread picks up the task and begins executing it. The task's code likely calls `.await` on a function to read the HTTP request from the socket.
4.  **Pending I/O**: The `Future` responsible for reading from the socket is polled. Since the data hasn't arrived yet, the `poll` method does two things:
    *   It registers the task's `Waker` with Tokio's I/O reactor, associating it with the "readable" event for that specific socket.
    *   It returns `Poll::Pending`.
5.  **Task Suspension**: The scheduler receives the `Pending` status and suspends the task. The worker thread is now free to poll other tasks, either from its local queue or by stealing from others.
6.  **OS Notification**: Eventually, the client sends the HTTP request data. The operating system notifies the `mio` `Poll` instance within Tokio's reactor that the socket is now readable.
7.  **Waking Up**: The reactor receives the event from `mio`. It looks up the `Waker` it stored for this socket event and calls `.wake()`.
8.  **Back to the Queue**: Waking the task notifies the scheduler to place it back into a worker's run queue.
9.  **Resuming Execution**: An available worker thread picks up the task and polls its `Future` again from its last suspension point.
10. **Completing the Read**: This time, when the `read` future is polled, the data is available in the socket. The read operation completes, and the `Future` returns `Poll::Ready` with the request data.
11. **Continuing the Work**: The task continues execution, processes the request, and likely enters another cycle of polling and suspension when it `.await`s writing the response back to the socket.

This cooperative dance between futures, wakers, the scheduler, and the I/O reactor allows a Tokio application to handle thousands of concurrent connections efficiently on a small number of threads.

Of course, here is a new section about recursion in async Rust that you can add to the blog post.

***

### Navigating Async Recursion: The Challenge of Infinite Size

Recursive patterns are a powerful tool in traditional synchronous programming, but they introduce a unique and fascinating challenge in the async world. The core of the issue lies in how Rust determines the size of types at compile time, a cornerstone of its memory safety guarantees.

an `async fn` is transformed by the compiler into a state machine, which is a `struct` that holds all the necessary state to drive the future to completion. Now, consider a direct recursive `async fn`:

```rust
// This will not compile!
async fn recursive_task(n: u32) {
    if n == 0 {
        return;
    }
    recursive_task(n - 1).await;
}
```

If we trace the compiler's logic, the state machine for `recursive_task` must contain the future returned by the nested call to `recursive_task`. This creates a type definition that contains itself, leading to a theoretically infinite size. Rust must know the size of every type at compile time, so this infinite recursion is disallowed. The compiler will stop you with an error, typically `E0733`, explaining that recursive `async fn` calls could be "infinitely sized".

#### The Solution: Indirection with `Box::pin`

To break this infinite size cycle, we need to introduce a layer of indirection. Instead of storing the recursive future directly within the parent future's state machine, we can store a pointer to it on the heap. This gives the type a known, fixed size at compile time (the size of a pointer).

The standard way to achieve this is by using `Box::pin`. `Box<T>` allocates the value `T` on the heap, and `Pin` ensures that the future, once allocated, will not be moved in memory, which is essential for the correctness of self-referential futures.

With a recent stabilization in Rust (since version 1.77), the syntax for this has become more ergonomic. You can now wrap the recursive call directly:

```rust
async fn recursive_task(n: u32) {
    if n == 0 {
        println!("Base case reached!");
        return;
    }
    println!("Recursing with n = {}", n);
    // Introduce indirection by boxing and pinning the recursive future.
    Box::pin(recursive_task(n - 1)).await;
}

#[tokio::main]
async fn main() {
    recursive_task(5).await;
}
```

Here's what happens:

1.  `recursive_task(n - 1)` creates a future for the next recursive call.
2.  `Box::pin(...)` allocates this future on the heap and pins it, returning a `Pin<Box<Future>>`. This boxed future has a fixed size.
3.  The `.await` polls this pinned, heap-allocated future to completion.

Because the state machine for `recursive_task` now only needs to store a `Pin<Box<...>>` (a smart pointer) instead of the full `Future` object inline, the compiler can determine its size, and the code compiles successfully.

#### A Practical Example: Traversing a Tree-like Structure

A common use case for async recursion is traversing a data structure where fetching child nodes is an asynchronous operation, such as querying a database or making a network request.

Imagine fetching comments and their threaded replies from an API:

```rust
use std::pin::Pin;
use futures::future::BoxFuture;

struct Comment {
    id: u32,
    text: String,
    children: Vec<u32>,
}

async fn fetch_comment_from_api(id: u32) -> Comment {
    // In a real application, this would be a network request.
    println!("Fetching comment {}", id);
    // Dummy implementation
    if id == 1 {
        Comment { id: 1, text: "Top-level comment".into(), children: vec![2, 3] }
    } else if id == 2 {
        Comment { id: 2, text: "Reply to comment 1".into(), children: vec![4] }
    } else if id == 3 {
        Comment { id: 3, text: "Another reply to 1".into(), children: vec![] }
    } else {
        Comment { id: 4, text: "Reply to comment 2".into(), children: vec![] }
    }
}

// Function to process a comment and its children recursively
fn process_comment_recursively(comment_id: u32) -> BoxFuture<'static, ()> {
    Box::pin(async move {
        let comment = fetch_comment_from_api(comment_id).await;
        println!("Processing: {}", comment.text);

        for child_id in comment.children {
            // Recursive call for each child
            process_comment_recursively(child_id).await;
        }
    })
}

#[tokio::main]
async fn main() {
    // Start processing from the root comment
    process_comment_recursively(1).await;
}
```
In this example, we've structured the function to return a `BoxFuture`, which is a type alias for `Pin<Box<dyn Future + ...>>`. This achieves the same goal of heap-allocating the future to break the recursive type definition. This pattern was more common before Rust 1.77 and is still very useful, especially in trait methods where you need to name the return type.

#### The `async-recursion` Crate

For those who find manual boxing cumbersome, the `async-recursion` crate provides a convenient procedural macro that handles the boxing automatically.

```rust
use async_recursion::async_recursion;

#[async_recursion]
async fn recursive_task(n: u32) {
    if n == 0 {
        return;
    }
    recursive_task(n - 1).await;
}
```
Under the hood, this macro rewrites your `async fn` to return a `Pin<Box<dyn Future>>`, effectively applying the same pattern we did manually but with zero boilerplate. It's a fantastic tool for cleaning up code and making async recursion feel more natural.

It is important to note that even with these techniques, async recursion is not tail-call optimized in Rust. An infinitely recursive async function will lead to an infinite chain of heap allocations, which will eventually exhaust memory. Therefore, it's best used for cases with a known, finite recursion depth, such as traversing a directory tree or processing a structured API response. For logic that needs to run indefinitely, a loop is almost always the better choice.Of course, here is a new section about recursion in async Rust that you can add to the blog post.

***

#### eg: Traversing a Tree-like Structure

A common use case for async recursion is traversing a data structure where fetching child nodes is an asynchronous operation, such as querying a database or making a network request.

Imagine fetching comments and their threaded replies from an API:

```rust
use std::pin::Pin;
use futures::future::BoxFuture;

struct Comment {
    id: u32,
    text: String,
    children: Vec<u32>,
}

async fn fetch_comment_from_api(id: u32) -> Comment {
    // In a real application, this would be a network request.
    println!("Fetching comment {}", id);
    // Dummy implementation
    if id == 1 {
        Comment { id: 1, text: "Top-level comment".into(), children: vec![2, 3] }
    } else if id == 2 {
        Comment { id: 2, text: "Reply to comment 1".into(), children: vec![4] }
    } else if id == 3 {
        Comment { id: 3, text: "Another reply to 1".into(), children: vec![] }
    } else {
        Comment { id: 4, text: "Reply to comment 2".into(), children: vec![] }
    }
}

// Function to process a comment and its children recursively
fn process_comment_recursively(comment_id: u32) -> BoxFuture<'static, ()> {
    Box::pin(async move {
        let comment = fetch_comment_from_api(comment_id).await;
        println!("Processing: {}", comment.text);

        for child_id in comment.children {
            // Recursive call for each child
            process_comment_recursively(child_id).await;
        }
    })
}

#[tokio::main]
async fn main() {
    // Start processing from the root comment
    process_comment_recursively(1).await;
}
```

In this example, we've structured the function to return a `BoxFuture`, which is a type alias for `Pin<Box<dyn Future + ...>>`. This achieves the same goal of heap-allocating the future to break the recursive type definition. This pattern was more common before Rust 1.77 and is still very useful, especially in trait methods where you need to name the return type.

tree or processing a structured API response. For logic that needs to run indefinitely, a loop is almost always the better choice.

### The Broader Async Ecosystem

While Tokio is the dominant runtime, it's worth noting that other options like `async-std` and `smol` exist, each with slightly different design philosophies.

Furthermore, the async ecosystem extends beyond just runtimes. The `tower` project, for instance, provides a library of modular and reusable components for building robust networking clients and servers. Its central abstraction is the `Service` trait, which represents an asynchronous function that takes a request and returns a response, making it a perfect fit for building middleware and services that compose gracefully.