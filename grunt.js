module.exports = function(grunt) {
	
  var qunitConfig = {
    src: ['src-test/test/maxmin-module/index.html']
  };
  var CONFIG_UTIL_DEST = "_build/";
  var CONFIG_UTIL_SRC = "src/util/";

  // Project configuration.
  grunt.initConfig({
	lint: {
      all: [
      'grunt.js', 'package.json',
      'src/**/*.js',
      'src-test/test/**/*.js'
      ]
    },
    watch: {
      scripts: {
        files: '<config:lint.all>',
        tasks: 'lint'
      }
    },
    jshint: {
      options: {
        browser: true
      }
    },
    qunit: qunitConfig,
    min: {
      util_static: {
		files: [
          {src: [
            'src/util/ct-util-event.js',
            'src/util/ct-util-funcs.js',
            'src/util/ct-util-storage.js'
            ],
            dest: '_build/testing/testing/util.min.js'
          }
        ]
      },
      util_dynamic: {
		files: [
          {
            expand: true,               // Enable dynamic expansion.
            cwd: 'src/util/',       // Src matches are relative to this path.
            src: ['*.js'],              // Actual pattern(s) to match.
            dest: '_build/testing/',        // Destination path prefix.
            ext: 'util.min.js'          // Dest filepaths will have this extension.
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-junit');
  // Default task.
  grunt.registerTask('default', 'lint', 'lint junit:env qunit:src min:util_static');

};