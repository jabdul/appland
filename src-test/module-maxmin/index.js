define([], function () {

  function Index() {
    /**
     * Name of test suite (containing folder).
     * @type {string}
     */
    var TEST_SUITE = 'module-image-viewer';
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
        dir + 'index-controller',
        dir + 'image-metadata-loader'
      ];
    }

    var publicMethods = {
      loadTestCases: loadTestCases
    };

    return publicMethods;
  }

  return Index();
});