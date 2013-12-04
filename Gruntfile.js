module.exports = function(grunt) {

  var CONFIG_LINT_FILES = [
        'Gruntfile.js', 'package.json',
        'src/**/*.js', 'src/**/*.json',
        '!src/lib/**/*.js', '!src/lib/**/*.json',
        'src-test/**/*.js', '!src-test/lib/**/*.js',
        '.skel/**/*.js', '.skel/**/*.json', '!.skel/_build/**/*.js'
      ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: CONFIG_LINT_FILES,
        tasks: ['jshint'],
        options: {
          interrupt: true
        }
      }
    },
    jshint: {
      all: CONFIG_LINT_FILES,
      options: {
        browser: true,
        globals: {
          jQuery: false
        }
      },
      ignore_warning: {
        options: {
        }
      }
    }
  });
  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Tasks...
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('test', []);
};