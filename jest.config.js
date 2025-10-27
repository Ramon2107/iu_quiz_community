/** @type {import('jest').Config} */
const config = {
  coverageReporters: ['clover', 'lcov', ['text', {skipFull: true}]],
};

module.exports = config;