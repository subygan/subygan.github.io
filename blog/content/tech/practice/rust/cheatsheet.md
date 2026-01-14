---
emoji: ⛓️
title: rust cheatsheet
description: Looking back at rust and it's shenanigans.
date: 2024-02-28
layout: base
tags: ["tech", "programming"]
---

```rust
let  x;      // declare "x"

x = 42;   // assign 42 to "x", type is inferred
```
or

```rust
let x = 42     //assigns variable


let x: i32;     //declaring variable "x" of 32 bit integer


foobar(x);    //uninitialised variable assignment


x = 52;         // assigning 52

foobar(x);    //x will be called

x = x + 12;    // x = 64 now



let _ = 42;    // does nothing, since 42 is a constant and _ is a placeholder

let _ = get_function();    //calls function and throws away the result

let _x = 42;   //compiler wont warn about unused variable
```

Just like in all languages elements within objects can be called using a dot.

```rust
let pair =  ('a', 17);  //creating pair variable  

let pair: (char, i32) = ('a', 17)  //also creates a pair  


println!( pair.0 )    //prints the first element 
 

println!( pair.1 )    //prints the second element 


let (left, right) = ('a', 17);    //assigns respective left and right 

//also works on functions 

let (left, right) = slice.split_at(middle);   //calls function middle and assigns to left and right 

or 

let ( _ , right) = slice.split_at(middle);   //calls function, throws away left assigns right 
```

### functions:

Start with braces, have their own scope

Return statements don't require semi colon


```rust
fn  fair_dice_roll() -> i32 { 
    return 4; 
    
} 
```

```rust
fn  fair_dice_roll()->i32{ 

    return 4    
}
```

 


```rust
fn  fair_dice_roll)->i32{ 
    4    //note that the return statement is not required and semicolon is not required 
    }
```

Comments:



Double Slash works for Single line comment


```rust
// This is a single line comment

// This is not read by the compiler
```



/* */ also works for Multi line comment



```rust
/* This is multi line comment

This can have as many lines as it can

and nothing will be read.

It can even have * */
```


comments can be between statement


```rust
let x = 5 + /*90+*/ 5; //This is valid comments 
```

### iterators:


Eg. `1..3` returns 1, 2

The `..=`  operator is used to generate an iterator that starts and ends with the value

Eg. `1..=3` returns 1,2,3 

 

### ownership

In Rust, it makes creating dangling pointers and creates safeguards

Basically:

- A reference cannot outlive its referent, You cannot refer and then send to an upper scope both the reference and the variable needs to outlive the scope
- Mutable reference cannot be aliased, i.e. you cannot have two mutable borrows.

### what does aliasing mean??
similar in cpp where when two references to the same objects are being used for different functions like reading and writing. (i.e.) unexpected behaviour when threading differently.

aliasing is useful for,
- Keeping values in registers by proving no pointers access teh value's memory
- eliminating reads by proving some memory hasn't been written to since last we read it.
- Moving/reordering reads and writes by proving there's no dependency.


### lifetimes in rust:

Whenever a borrow or a reference is done in rust a new block is initialized.

eg.
the following code.
```rust

let x = 0;
let z;
let y = &x;
z = y;
```
could be rewritten as

```rust
'a: {
    let x: i32 = 0;
    'b {
        let z: &'b i32;
        'c {
            let y: &'b i32 = &'b x;
            x = y;
        }
    }
}       
```

