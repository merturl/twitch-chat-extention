module.exports = (api) => {
  return {
    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          // caller.target will be the same as the target option from webpack
          targets: api.caller((caller) => caller && caller.target === 'node')
            ? { node: 'current' }
            : {
                edge: '17',
                firefox: '60',
                chrome: '67',
                safari: '11.1',
                ie: '9',
              },
          corejs: 3,
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
  };
};
