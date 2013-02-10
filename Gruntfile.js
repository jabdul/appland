module.exports = function(grunt) {
	
  var CONFIG_DEST_UTIL = "_build/src/_util/";
  var CONFIG_SRC_UTIL = "src/_util/";
  var CONFIG_LINT_FILES = [
      'Gruntfile.js', 'package.json',
      'src/**/*.js', 'src/**/*.json', '!src/lib/**/*.js', '!src/lib/**/*.json', '!src/log/*.js',
      'src-test/test/**/*.js', '!src-test/test/require.config.js'
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
      util_all: {                                 // Concatenate util files into a single file.
		files: [
          {src: [CONFIG_SRC_UTIL + '*.js'],
           dest: CONFIG_DEST_UTIL + 'util-all.min.js'
          }
        ]
      },
      util_dynamic: {
		files: [
          {
            expand: true,                          // Enable dynamic expansion.
            cwd: CONFIG_SRC_UTIL,                  // Src matches are relative to this path.
            src: ['*.js'],                         // Actual pattern(s) to match.
            dest: CONFIG_DEST_UTIL,                // Destination path prefix.
            ext: '.min.js'                    // Dest filepaths will have this extension.
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