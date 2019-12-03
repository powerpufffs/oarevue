// module.exports = {
//   preset: '@vue/cli-plugin-unit-jest'
// }

module.exports = {
  verbose: true,
  moduleFileExtensions: [
      "js",
      "json",
      "vue"
  ],
  transform: {
      ".*\\.(vue)$": "vue-jest",
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  collectCoverage: false,
  collectCoverageFrom: [
      "src/components/*.{js,vue}",
      "!**/node_modules/**"
  ],
  coverageReporters: [
      "html",
      "text-summary"
  ],
}

// module.exports = {
//   moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
//   transform: {
//     '^.+\\.vue$': 'vue-jest',
//     '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
//       'jest-transform-stub',
//     '^.+\\.(js|jsx)?$': 'babel-jest'
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1'
//   },
//   snapshotSerializers: ['jest-serializer-vue'],
//   testMatch: [
//     './tests/unit/**'
//   ],
//   transformIgnorePatterns: ['<rootDir>/node_modules/']
// };