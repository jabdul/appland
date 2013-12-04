define([], function () {

  function Index() {
    /**
     * Name of test suite (containing folder).
     * @type {string}
     */
    var TEST_SUITE = 'module-appland';


    /**
     * Load test cases.
     * @returns {Array}
     */
    function loadTestCases() {
      var dir = TEST_SUITE + '/';
      return [
        dir + 'main'
      ];
    }

    var publicMethods = {
      loadTestCases: loadTestCases
    };

    return publicMethods;
  }

  return Index();
});