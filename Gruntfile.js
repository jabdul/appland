module.exports = function(grunt) {
	
  var CONFIG_UTIL_DEST = "_build/";
  var CONFIG_UTIL_SRC = "src/util/";
  var CONFIG_LINT_FILES = [
      'grunt.js', 'package.json',
      'src/**/*.js', 'src/**/*.json',
      'src-test/test/**/*.js'
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
        browser: true
      }
    },
    qunit: {
      all: ['src-test/test/**/test-*.html']
    },
    qunit_junit: {
      options: {
        dest: "src-test/result"
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      util_all: {
		files: [
          {src: [CONFIG_UTIL_SRC + '*.js'],
           dest: CONFIG_UTIL_DEST + 'testing/js/ct-util-all.min.js'
          }
        ]
      },
      util_dynamic: {
		files: [
          {
            expand: true,                          // Enable dynamic expansion.
            cwd: CONFIG_UTIL_SRC,                  // Src matches are relative to this path.
            src: ['*.js'],                         // Actual pattern(s) to match.
            dest: CONFIG_UTIL_DEST + 'testing/js', // Destination path prefix.
            ext: '-util.min.js'                     // Dest filepaths will have this extension.
          }
        ]
      }
    }
  });
  // Load the plugins
  grunt.loadNpmTasks('grunt-qunit-junit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Tasks...
  grunt.registerTask('default', ['jshint', 'qunit_junit', 'qunit:all', 'uglify:util_dynamic', 'uglify:util_all']);
  grunt.registerTask('hint', ['jshint']);
};