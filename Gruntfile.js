module.exports = function(grunt) {
	
  var CONFIG_UTIL_DEST = "_build/";
  var CONFIG_UTIL_SRC = "src/util/";

  // Project configuration.
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: '<config:jshint.all>',
        tasks: 'jshint:all'
      }
    },
    jshint: {
      all: [
      'grunt.js', 'package.json',
      'src/**/*.js',
      'src-test/test/**/*.js'
      ],
      options: {
        browser: true
      }
    },
    qunit: {
      all: ['src-test/test/**/*-test.html']
    },
    qunit_junit: {
      options: {
        dest: "src-test/result"
      }
    },
    uglify: {
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
  grunt.registerTask('watch', ['watch']);
};