---
emoji: 🔁
title: recursions
description: notes on working with recursions and how to use them better
date: 2026-03-04
location: NYU langone, new york
layout: base
tags: ["tech", "programming"]
---


Recursion is often taught in Computer Science 101 as an elegant, mathematically pure way to solve problems and used widely in leetcode style problems. However, in production environments using mainstream imperative languages (like Python, JavaScript, Java, or C++), it is heavily discouraged. Recursions are usually a footgun in waiting because of some technical

### 1. Async repositories and state machines get hairy

When you write an `async` function in languages like JavaScript, C#, or Rust, the compiler transforms your code under the hood using. In JavaScript, it creates a chain of `Promise` objects. In Rust and C#, it generates a complex State Machine. 
If you write a recursive `async` function, you are not just pushing to the execution stack; you are allocating new Promise objects or State Machine structs on the **heap** for every single call. [i wrote a bit about async state machine a bit before](/tech/practice/rust/async-rust)


* **The Heap Leak:** Even if you don't hit a traditional stack overflow because the event loop unwinds the stack at every `await`, you are keeping an ever-growing chain of unresolved Promises in heap memory until the base case is reached.
* **The Rust Problem:** In Rust, a recursive `async` function is actually impossible to compile out-of-the-box. Because `async` functions compile to state machines that must know their exact size in memory at compile-time, a recursive state machine has an infinite size. You are forced to use `Box::pin` to dynamically allocate it on the heap, which incurs severe performance penalties.


### 2. Without [Tail Call Optimization (TCO)](https://stackoverflow.com/questions/310974/what-is-tail-call-optimization), stack overflow is common


Every time a function calls itself, the CPU has to create a new **Stack Frame**. This frame holds the instruction pointer (where to return to), the function's arguments, and local variables. 

The call stack has a hard memory limit (e.g., Python limits it to 1,000 frames by default, Node.js around 10,000). If your dataset grows larger than this limit, your application will violently crash with a `StackOverflowError`. Mainstream languages like Python, Java, and standard JavaScript (V8) **do not** support Tail Call Optimization, meaning every recursive step guarantees consumed memory.

most debug builds don't do TCO because it is expensive for the compiler. if you enable TCO your compilations will become longer.
if you're developing something and stress testing it on a large volume of data/compute building a TCO enabled build is annoying, not to mention the overhead of turning this off and on during local builds.

### 3. The "Pass-by-Value" Memory Footgun

A very common footgun occurs when users copy a lot of data over the function boundary. If you are using a language with pass-by-value semantics (like Go or C++) and you pass a large struct or array into a recursive function, that entire chunk of data is duplicated into the new stack frame. If your recursion goes 500 levels deep, you have just allocated 500 copies of that data. This leads to quadratic memory growth and shreds your CPU cache locality, slowing down execution massively.


### 4. Exponential Time Complexity Traps

Because recursion hides the complexity of loops behind function calls, it's very easy to accidentally write algorithms that scale at `O(2^n)` or even `O(N!)`. The classic recursive Fibonacci sequence is a prime example: `fib(n) = fib(n-1) + fib(n-2)`. Because it branches twice per frame without memoization, calling `fib(40)` results in over 100 million redundant function calls, freezing your program over a task that an iterative `for` loop could solve in microseconds.

---

## loop-less languages? 🧐

Functional languages like Erlang, Elixir, Haskell, and Lisp don't have standard `for` or `while` loops, and that's completely okay because **their compilers and Virtual Machines are explicitly designed around recursion.** 

Here is why recursion is safe—and actually preferred—in functional environments:

1. **Guaranteed Tail-Call Optimization (TCO):** 
   If the recursive call is the very last instruction in a function, the compiler realizes it doesn't need to save the current state. Instead of creating a new stack frame, the compiler simply updates the arguments and jumps back to the top of the current frame (essentially compiling the recursion into a highly optimized `goto` statement at the machine-code level). This means tail-recursive functions execute in `O(1)` constant space, acting exactly like a `while` loop.

2. **Immutability and Accumulators:** 
   Because functional languages use immutable data structures, there is no "copying large objects over boundaries." Data is shared via pointers. To replace loop variables, functional languages use **accumulators**—passing the running total or state as an argument into the next tail call. which also nullifies the pass-by-value footbug
3. **The BEAM VM (Erlang/Elixir):**
   By enforcing loop-less, tail-recursive actors, the BEAM VM can easily preempt and pause recursive processes in the middle of execution, allowing millions of lightweight actors to share CPU time. which makes recursion completely fine to use
---

## How to Prevent Using Recursion

If you are working in C#, Python, JavaScript, Java, or Go, you should default to iterative solutions.

### 1. Use an Explicit Stack (Heap-allocated)


Any recursive algorithm (like Depth-First Search for a tree) can be rewritten iteratively using a standard `while` loop and an explicit Stack or Queue (like an Array, `List`, or `Vec`). 
Instead of letting the OS manage your execution stack, you manage a data structure on the heap. The heap has gigabytes of available memory, completely eliminating the risk of a Stack Overflow.


This makes it so much easier when your computation grows. now the stack is under your control and it only adds very little extra code.

```javascript
// BAD: Recursive tree traversal (Risk of Stack Overflow)
function traverse(node) {
    if (!node) return;
    console.log(node.value);
    traverse(node.left);
    traverse(node.right);
}

// GOOD: Iterative tree traversal using an explicit stack
function traverseIterative(root) {
    if (!root) return;
    const stack = [root]; // Heap-allocated stack
    
    while (stack.length > 0) {
        const node = stack.pop();
        console.log(node.value);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
}
```

### 2. Trampolining (For functional patterns in imperative languages)
If you *must* write recursive-style code in a language without TCO (like JavaScript), you can use a technique called "Trampolining." Instead of a function calling itself, it returns a *thunk* (a new anonymous function) that wraps the next step. A central `while` loop (the trampoline) continuously invokes the returned functions until the final result is reached. This keeps the call stack exactly one level deep.

### 3. Convert Async Recursion to `while(true)` loops
Never recurse inside an `async` function. Instead, wrap the logic in a `while` loop and `await` the asynchronous operations. 
```javascript
// BAD: Async recursion (Heap memory leak via unresolved promises)
async function pollData() {
    const data = await fetch('/api');
    if (!data.ready) {
        await new Promise(r => setTimeout(r, 1000));
        return pollData(); // Danger!
    }
    return data;
}

// GOOD: Async iteration
async function pollDataSafe() {
    while (true) {
        const data = await fetch('/api');
        if (data.ready) return data;
        await new Promise(r => setTimeout(r, 1000));
    }
}
```
