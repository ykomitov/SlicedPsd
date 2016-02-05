module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'dev/scripts/**/*.js'
      ]
    },
    //jade: {
    //  serve: {
    //    files: {
    //      'dev/sample-jade.html': 'app/sample-jade.jade'
    //    }
    //  },
    //  build: {
    //    files: {
    //      'dist/sample-jade.html': 'app/sample-jade.jade'
    //    }
    //  }
    //},
    copy: {
      serve: {
        files: [
          {expand: true, src: ['app/images/*'], dest: 'dev/images/', filter: 'isFile', flatten: true},
          {expand: true, src: ['app/js/*'], dest: 'dev/js/', filter: 'isFile', flatten: true},
          {expand: true, src: ['app/index.html'], dest: 'dev/', flatten: true},
          {expand: true, src: ['app/styles/*'], dest: 'dev/styles/', flatten: true},
          {expand: true, src: ['app/styles/fonts/*'], dest: 'dev/styles/fonts', flatten: true}
        ]
      },
      build: {
        files: [
          {expand: true, src: ['app/images/*'], dest: 'dist/images/', filter: 'isFile', flatten: true},
          {expand: true, src: ['app/js/*'], dest: 'dist/js/', filter: 'isFile', flatten: true},
          {expand: true, src: ['app/index.html'], dest: 'dist/', flatten: true},
          {expand: true, src: ['app/styles/*'], dest: 'dist/styles/', flatten: true}
        ]
      }
    },
    stylus: {
      serve: {
        files: {
          'dev/styles/site.css': 'app/site.styl'
        }
      },
      build: {
        files: {
          'dist/styles/site.css': 'app/site.styl'
        }
      }
    },
    csslint: {
      build: {
        src: ['dist/**/*.css'],
        quiet: true
      }
    },
    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'dist/styles',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles/min',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      styles: {
        files: ['app/**/*.styl'],
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      },
      jade: {
        files: ['app/**/*.jade'],
        tasks: ['jade'],
        options: {
          livereload: true
        }
      },
      copy: {
        files: ['app/**/*.html', 'app/**/*.js'],
        tasks: ['copy'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'app/**/*.jade',
          'app/**/*.styl',
          'app/**/*.html'
        ]
      }
    },
    connect: {
      options: {
        port: 9578,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            'dev'
          ]
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('serve', ['jshint', 'stylus:serve', 'copy:serve', 'connect', 'watch']);
  grunt.registerTask('build', ['stylus:build', 'csslint', 'cssmin:build', 'jshint', 'copy:build', 'jade:build', 'uglify:build']);
};