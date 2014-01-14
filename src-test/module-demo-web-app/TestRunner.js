require(['module.config.js'], function () {
  require([
    'jquery',
    '../../src-test/module-demo-web-app/index'
  ], function (
      $,
      moduleDemoWebApp) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
      return htmlReporter.specFilter(spec);
    };

    // Setup test suites
    var specs = [],
        TESTS_DIR = '../../src-test/',
        testSuites = [
          moduleDemoWebApp
        ];

    loadTestSuites(testSuites);

    /**
     * Load test suites.
     * @param {Array} testSuites
     * @returns {undefined}
     */
    function loadTestSuites (testSuites) {
      for (var i = 0, tests, len = testSuites.length, j, ln; i < len; i++) {
        tests = testSuites[i].loadTestCases();
        ln = tests.length;
        for (j = 0; j < ln; j++) {
          specs.push(TESTS_DIR + tests[j]);
        }
      }
    }

    $(function(){
      require(specs, function(){
        jasmineEnv.execute();
      });
    });
  });
});
