const SUCCESS_TEST = 'SUCCESS_TEST';

const successTest = () => ({
  type: SUCCESS_TEST,
  payload: {
    success: true
  }
});

module.exports = {
  SUCCESS_TEST,
  successTest
};
