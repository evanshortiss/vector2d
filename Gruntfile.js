module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: {
        src: [
          './src/*.js',
        ]
      }
    },

    replace: {
      build: {
        src: ['./src/Closure.js'],
        dest: './build/vec2d.js',
        replacements: [{
          from: '// Source is injected here, just run "grunt build"',
          to: function() {
            var buf = '';

            buf += grunt.file.read('./src/ArrayVector.js');
            buf += grunt.file.read('./src/ObjectVector.js');
            buf += grunt.file.read('./src/Vec2D.js');

            return buf;
          }
        }]
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'nyan',
          quiet: false
        },
        src: ['./test/*'],
        dest: './'
      }
    },

    uglify: {
      mangle: {
        options: {
          banner: grunt.file.read('./LICENSE'),
        },
        files: {
          './build/vec2d.min.js': './build/vec2d.js'
        }
      },
      prettify: {
        options: {
          banner: grunt.file.read('./LICENSE'),
          preserveComments: true,
          compress: false,
          beautify: {
            beautify: true,
            indent_level: 2
          },
          mangle: false,
        },
        files: [{
          './build/vec2d.js': './build/vec2d.js'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['build', 'mochaTest'])
  grunt.registerTask('build', ['jshint', 'replace', 'uglify:mangle', 'uglify:prettify']);

};