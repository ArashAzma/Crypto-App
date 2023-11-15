module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['@legendapp/state/babel', 'react-native-reanimated/plugin'],
  };
};
