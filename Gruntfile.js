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

    browserify: {
      dist: {
        files: {
          './build/vec2d.js': ['./src/Vec2D.js'],
        },
        options: {
          bundleOptions: {
            'standalone': 'Vec2D'
          }
        }
      }
    },

    uglify: {
      mangle: {
        files: {
          './build/vec2d.min.js': ['./build/vec2d.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['jshint', 'browserify:dist', 'mochaTest'])
  grunt.registerTask('build', ['jshint', 'browserify:dist', 'uglify:mangle']);

};