define([], function () {

  function Index() {
    /**
     * Name of test suite (containing folder).
     * @type {string}
     */
    var TEST_SUITE = 'module-demo-backbone';
    /**
     * Override default 'jasmine-fixtures' for this module's
     * own container.
     */
    jasmine.getFixtures().fixturesPath = './fixture';
    /**
     * Load test cases.
     * @returns {Array}
     */
    function loadTestCases() {
      var dir = TEST_SUITE + '/';
      return [
        dir + '/model/article-model',
        dir + '/collection/article-collection',
        dir + '/view/home-view'
      ];
    }

    var publicMethods = {
      loadTestCases: loadTestCases
    };

    return publicMethods;
  }

  return Index();
});