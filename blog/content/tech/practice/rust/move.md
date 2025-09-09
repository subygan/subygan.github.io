---
emoji: ⛓️
title: Rust `move` keyword
description: I use move way too often than I like, and needed to understand it a bit deeper. this is my attempt at it.
date: 2025-09-09
layout: base
---



## What is "move" 

When you assign a value to a new variable or pass a value to a function, the default behavior for types that don't implement the `Copy` trait is to "move" ownership of that value. This means the original variable can no longer be used after the move. This prevents double-free errors and other memory safety issues by ensuring there's always only one owner of the data at any given time. This forms the base of the ownership model, which can be represented like below.

Let's illustrate with an example:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2

    // println!("{}", s1); // This would result in a compile-time error!
    println!("{}", s2);
}
```

In this example, `String` does not implement the `Copy` trait. When `s1` is assigned to `s2`, the ownership of the `String` data (which lives on the heap) is transferred from `s1` to `s2`. Conceptually, `s1` is no longer valid, and trying to use it after the move will result in a compile-time error: "use of moved value: `s1`".

## Under the Hood: What Happens During a Move?

To understand the internals a bit deeper let's consider how `String` is structured. A `String` in Rust is a struct that typically contains three pieces of information:

1.  **Pointer:** A pointer to the actual character data on the heap.
2.  **Length:** The number of bytes currently used by the string.
3.  **Capacity:** The total number of bytes allocated for the string on the heap.

```rust
struct String {
    ptr: *mut u8,
    len: usize,
    capacity: usize,
}
```

When you write `let s2 = s1;` for a `String`:

1.  **Bitwise Copy:** The stack-allocated data of `s1` (its `ptr`, `len`, and `capacity`) is bitwise copied to `s2`. This means `s2` now has a copy of the pointer to the heap data, and the same length and capacity values.
2.  **Invalidation of Original:** To prevent a double-free, Rust conceptually "nukes" the original `s1`. This isn't a literal memory zeroing; instead, `s1` is marked as invalid, and its destructor (`drop` implementation) will not be called when `s1` goes out of scope. If `s1` were allowed to be dropped, it would attempt to free the same heap memory that `s2` now owns, leading to a use-after-free or double-free bug.


## Moves with Function Calls

Passing a value to a function also involves a move:

```rust
fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string goes out of scope and `drop` is called

fn main() {
    let s = String::from("world");
    takes_ownership(s); // s is moved into takes_ownership

    // println!("{}", s); // Error: use of moved value!
}
```

Here, `s` is moved into the `some_string` parameter of `takes_ownership`. After the function call, `s` is no longer valid.

## Moves in Closures

The `move` keyword is explicitly used in closures to force them to take ownership of the variables they capture from their environment, even if they would normally borrow them.

```rust
fn main() {
    let s = String::from("hello");
    let c = move || {
        println!("{}", s); // s is moved into the closure
    };
    c();
    // println!("{}", s); // Error: use of moved value!
}
```

Without `move`, if the closure only needed to immutably borrow `s`, it would do so. By adding `move`, you ensure the closure owns `s`, which is particularly useful when passing closures across threads or returning them from functions where their captured environment needs to outlive the original scope.

## Types that `Copy` (and don't Move)

Not all types move. Primitive types like integers (`i32`, `u64`), booleans (`bool`), floating-point numbers (`f64`), and characters (`char`), as well as tuples containing only `Copy` types, implement the `Copy` trait. For these types, a bitwise copy is performed, but the original variable remains valid. This is because these types have a known, fixed size at compile time, and their values are entirely stored on the stack. Copying them is cheap, and there's no heap data to worry about double-freeing.

```rust
fn main() {
    let x = 5;
    let y = x; // x is copied to y

    println!("x: {}, y: {}", x, y); // Both are still valid
}
```

You can also derive the `Copy` trait for your own structs, but only if all of their fields implement `Copy`. If a struct contains a `String`, for example, it cannot implement `Copy`.

## Edge Cases and Common Pitfalls I've faced

1.  **Returning Values:** When a value is returned from a function, ownership is moved back to the caller.

    ```rust
    fn gives_ownership() -> String {
        let some_string = String::from("yours");
        some_string // some_string is moved out of the function
    }

    fn main() {
        let s = gives_ownership();
        println!("{}", s); // s is valid here
    }
    ```

2.  **Multiple Owners (via Cloning):** If you truly need multiple independent owners of data, you must explicitly `clone()` it. Cloning performs a deep copy of the data, including any heap allocations.

    ```rust
    fn main() {
        let s1 = String::from("hello");
        let s2 = s1.clone(); // s2 is a deep copy, s1 is still valid

        println!("s1: {}, s2: {}", s1, s2);
    }
    ```
    __Cloning can be an expensive operation, especially for large data structures, as it involves allocating new memory and copying all the data.__

3.  **Borrowing to Avoid Moves:** Often, you don't need to take ownership of data, but merely inspect or modify it temporarily. This is where borrowing (`&` for immutable, `&mut` for mutable) comes in. Borrowing allows you to use a value without taking ownership, thus avoiding a move.

    ```rust
    fn calculate_length(s: &String) -> usize { // takes a reference
        s.len()
    }

    fn main() {
        let s1 = String::from("hello");
        let len = calculate_length(&s1); // s1 is borrowed
        println!("The length of '{}' is {}.", s1, len); // s1 is still valid
    }
    ```

**Performance Implications**

The "move" itself in Rust is generally a very cheap operation. It typically involves a bitwise copy of stack-allocated pointer, length, and capacity fields. It does **not** involve copying the heap data. The performance overhead comes from the *absence* of moves, specifically when you *need* to clone data.

*   **Cheap Moves:** Moving a `String` (or `Vec`, `Box`, etc.) only copies the stack-allocated metadata. The underlying heap data is *not* copied. This is extremely efficient.
*   **Expensive Clones:** If you frequently `clone()` large data structures, you are performing deep copies, which involve new memory allocations and copying potentially vast amounts of data. This can be a significant performance bottleneck.
*   **Zero-Cost Abstractions:** Rust's ownership system, with moves and borrows, is a "zero-cost abstraction." This means you get memory safety without paying a runtime performance penalty compared to manually managing memory in C/C++. The compiler enforces the rules at compile time, and the runtime cost of moving is minimal.

**When to Use `move` in Closures (and when not to)**

The explicit `move` keyword for closures is crucial:

*   **`move` when you need ownership:** If the closure's lifetime extends beyond the scope where the captured variables are defined (e.g., returning the closure, spawning a new thread with it), you *must* use `move` to ensure the captured variables remain valid.
*   **Don't `move` if borrowing is sufficient:** If the closure only needs a temporary reference to the variables and its lifetime is shorter than or equal to the variables' lifetime, borrowing is more efficient and less restrictive. The compiler will often infer the correct borrowing without `move`.
