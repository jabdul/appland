module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'src/index.js', 'src/maxmin/controller/*.js', 'src/maxmin/model/*.js',
      'src-test/test/maxmin/model/*.js', 'src-test/test/maxmin/controller/*.js']
    },
    jshint: {
      options: {
        browser: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');

};