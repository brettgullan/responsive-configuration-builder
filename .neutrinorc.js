module.exports = {
  use: [
    ['@neutrinojs/library', { name: 'ResponsiveTools' }],
    ['@neutrinojs/mocha', { require: './test/setup' }],
  ],
}
