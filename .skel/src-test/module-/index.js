define([], function () {

  function Index() {
    /**
     * Name of test suite (containing folder).
     * @type {string}
     */
    var TEST_SUITE = 'module-{MODULE-NAME}';
    /**
     * Path to fixtures for this test suite.
     */

    /**
     * Load test cases.
     * @returns {Array}
     */
    function loadTestCases() {
      var dir = TEST_SUITE + '/';
      return [
        dir + 'welcome'
      ];
    }

    var publicMethods = {
      loadTestCases: loadTestCases
    };

    return publicMethods;
  }

  return Index();
});