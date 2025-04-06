module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@assets': './assets',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@styles': './src/styles',
            '@contexts': './src/contexts',
            '@services': './src/services',
            '@i18n': './src/i18n'
          },
        },
      ],
    ],
  };
}; 