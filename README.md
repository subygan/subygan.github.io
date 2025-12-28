### My website located suriya.cc
Super simple website with no complication
we're using notion for writing and typora for its design.
So everything that we write on notion, has to be transferred to typora, compiled to html and then
committed to the directory

### Articles to write

- [ ] PIPL review
- [ ] DPDPA review
- [ ] ML notes

### TODO

- [ ] Newsletter
- [x] back button
- [x] update ML/AI section
- [x] Recent articles at the bottom/sides?
- [x] Make a simple navigation bar
- [x] Simple sub indexing system in ruby.

## Manual:

- `{{ partial "toc.html" .}}` can be used in any default template to be tested

- `{{< pdf src="/vani_ma_recipes.pdf" >}}` can be used to embed pdf into the page.


### importing code snippets from other files.
```
{{% code file="./file.go" language="go" %}}
```
"./" for relative imports "/assets/file/" for absolute imports


### Quarto

supports, `.qmd` files. to render math add `math: true` in the front matter. we use katex to convert it to latex on the client side.

use `quarto render` to render the files

When using quarto files, make sure the format is `topic/index.md` as opposed to `topic.md`



~~## Workflow~~
~~The workflow is simple,~~ 
~~- create a new notebook in notion. keep taking notes there. Notion is especially~~
~~incredible for this task.~~
  
~~- if notion is with header then use /blog/example/example_with_header_img.html~~
~~and fill content from typora~~ 
  
~~- else, use /blog/example/example.html~~

~~- the difference between the two is actually just a css tag.~~






