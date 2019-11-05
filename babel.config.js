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
    '@babel/transform-runtime',
    'babel-plugin-css-modules-transform',
    '@babel/plugin-transform-react-inline-elements',
    'babel-plugin-macros'
  ]
};
