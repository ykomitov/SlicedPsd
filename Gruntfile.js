module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'dev/scripts/**/*.js'
      ]
    },
    copy: {
      serve: {
        files: [
          {expand: true, cwd: 'app/fonts/', src: ['**'], dest: 'dev/fonts/', filter: 'isFile', flatten: false},
          {expand: true, cwd: 'app/images/', src: ['**'], dest: 'dev/images/', filter: 'isFile', flatten: false},
          {expand: true, src: ['app/js/*'], dest: 'dev/js/', filter: 'isFile', flatten: true},
          {expand: true, src: ['app/*.html'], dest: 'dev/', flatten: true},
          {expand: true, src: ['app/styles/*.css'], dest: 'dev/styles/', flatten: true},
          {expand: true, src: ['app/styles/fonts/*'], dest: 'dev/styles/fonts', flatten: true}
        ]
      },
      build: {
        files: [
          {expand: true, cwd: 'app/fonts/', src: ['**'], dest: 'dist/fonts/', filter: 'isFile', flatten: false},
          {expand: true, cwd: 'app/images/', src: ['**'], dest: 'dist/images/', filter: 'isFile', flatten: false},
          {expand: true, src: ['app/js/lib/*.js'], dest: 'dist/js/', filter: 'isFile', flatten: true},
          {expand: true, src: ['app/*.html'], dest: 'dist/', flatten: true},
          {expand: true, src: ['app/styles/*.css'], dest: 'dev/styles/', flatten: true}
        ]
      }
    },
    stylus: {
      serve: {
        files: {
          'dev/styles/site.css': 'app/styles/site.styl',
          'dev/styles/main-slider.css': 'app/styles/main-slider.styl',
          'dev/styles/slider-yzk.css': 'app/styles/slider-yzk.styl'
        }
      }
    },
    csslint: {
      serve: {
        src: ['dev/styles/**/*.css'],
        quiet: true
      },
      build: {
        src: ['dist/**/*.css'],
        quiet: true
      }
    },
    cssmin: {
      serve: {
        files: [{
          expand: true,
          cwd: 'dev/styles',
          src: ['*.css', '!*.min.css'],
          dest: 'dev/styles/min',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'dist/js/site.min.js': ['app/js/panel.js', 'app/js/slick-init.js', 'app/js/slider-yzk.js']
        }
      }
    },
    concat: {
      build: {
        src: 'dev/styles/min/*.css',
        dest: 'dist/styles/site.min.css'
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
      copy: {
        files: ['app/**/*.html', 'app/**/*.js', 'app/**/*.css'],
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
          'app/**/*.styl',
          'app/**/*.html',
          'app/**/*.css'
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
            'dist'
          ]
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('serve', ['jshint', 'stylus:serve', 'csslint:serve', 'copy:serve', 'cssmin']);
  grunt.registerTask('build', ['stylus', 'copy:build', 'stylus', 'cssmin', 'csslint:build', 'jshint', 'uglify', 'concat', 'connect', 'watch']);
};