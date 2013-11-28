define([], function () {

  function Index() {
    /**
     * Name of test suite (containing folder).
     * @type {string}
     */
    var TEST_SUITE = 'module-faceted-main';
    /**
     * Path to fixtures for this test suite.
     */
    //jasmine.getFixtures().fixturesPath = TEST_SUITE + '/fixtures';

    /**
     * Load test cases.
     * @returns {Array}
     */
    function loadTestCases() {
      var dir = TEST_SUITE + '/';
      return [
        dir + 'wgsn-image-resizer'
      ];
    }

    var publicMethods = {
      loadTestCases: loadTestCases
    };

    return publicMethods;
  }

  return Index();
});