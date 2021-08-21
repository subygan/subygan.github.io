const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
console.log(withMDX)
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
})
