module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' },
      exclude: ['transform-regenerator'],
    }],
    '@babel/preset-react',
    'minify',
  ],
  plugins: [
    '@babel/transform-runtime'
  ]
};
