module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathPrefix: '~',
            rootPathSuffix: './src',
          },
        ],
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        'babel-plugin-root-import',
        {
          paths: [
            {
              rootPathPrefix: '~',
              rootPathSuffix: './src',
            },
          ],
        },
      ],
    },
  },
};
