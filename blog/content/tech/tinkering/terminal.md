---
emoji: 🐢
title: Terminal
description: I built a terminal editor and had to dig deep into understanding the terminal better
date: 2024-08-08
layout: base
---

__Raw mode__ in a terminal is receiving the raw bytes from the `STDIN` file.
terminal usually gets opened in __canonical mode__ which means input is fed to the program one line at a time, instead of character by character. This can be done by unsetting the `ICANON` flag. There are a lot of these _bitflags_

| Flag     | Description                                                                                                                                                |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ICANON` | canonical flag to indicate that the input is read line by line                                                                                             |
| `ISIG`   | Controls signals like `ctrl+c`, `ctrl+z` and others.                                                                                                       |
| `ECHO`   | Echoing the input to the terminal. i.e. seeing what you are typing                                                                                         |
| `IXON`   | Controls `ctrl+s`,`ctrl+q` the name comes from the signals these send, `XOFF` and `XON`                                                                    |
| `IEXTEN` | Controls `ctrl+v`. This command sends all the bytes to the program. i.e. `ctrl+v` and <br/>`ctrl+c` would send the `ctrl+c` to the program instead         |
| `ICRNL`  | Maps the _Carriage Return_ (Return to the new line) to _New Line_ character.                                                                               |
| `OPOST`  | Controls the post processing of characters. (e.g.) `\n` character is generally rendered out as `\r\n` this is to move the cursor to the begining + newline |
| `        |                                                                                                                                                            |
| `        |                                                                                                                                                            |

`ctrl+s` freezes the program and `ctrl+q` continues it
`ctrl+z` runs it in the background `fg` can be used to run it in the foreground