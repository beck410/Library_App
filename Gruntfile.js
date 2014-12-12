  module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.css','!*.min.css'],
          dest: 'app/dist/styles/',
          ext: '.min.css'
        }]
      }
	},

    uglify: {
      options: {
        manage: false
      },
      my_target: {
        files: {
          'app/dist/js/<%= pkg.name %>.min.js': ['app/dist/js/<%= pkg.name %>.js'],
        }
      }
    },

    concat: {
      options: {
        seperator: ';',
        stripBanners: true
        },
      dist: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '+ '<% grunt.template.today("yyy-mm-dd") %>' + '*/',
        src: 'app/js/*.js',
        dest: 'app/dist/js/<%= pkg.name %>.js'
      }
    },

    sass: {
      options: {
        compress: false,
        sourcemap: 'none'
      },
      dist: {
        files: {
          'app/styles/<%= pkg.name %>.css': 'app/sass/main.scss'
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: ['app/*.html','app/views/*.html','app/sass/*.scss', 'app/styles/*.css','app/js/*.js']
      },
      sass: {
        files: ['app/sass','app/sass/*.scss', 'app/dist/styles/*.css'],
        tasks: ['sass', 'cssmin','uncss']
      },

      js: {
      	files: ['app/js', 'app/js/*.js', 'app/dist/js/*.js'],
      	tasks: ['concat', 'uglify']
      }
    },

    uncss: {
      dist: {
        files: {
          'app/dist/styles/<%= pkg.name %>.css': ['app/*.html']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: [ '*.png', '*.svg', '*.jpg' ],
          dest: 'app/dist/images'
        }]
      }
    },

    notify_hooks: {
      options: {
        enable: true,
        max_jshint_notifications: 5
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      files: ['Gruntfile.js', 'app/js/**/*.js','test/*.js']
    },

    connect: {
      options: {
        port: 8000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: 'app/'
        }
      }
    },

    bowercopy: {
      options: {
        srcPrefix: 'bower_components',
      },
      scripts: {
        options: {
          destPrefix: 'app/dist/'
          },
        files: {
          'js/firebase/firebase.js': 'firebase/firebase.js',
          'js/jquery/jquery.min.js': 'jquery/dist/jquery.js',
          'js/angular/angular.js': 'angular/angular.js',
          'js/angular-route/angular-route.min.js': 'angular-route/angular-route.min.js',
          'js/angular-route/angular-route.min.js.map': 'angular-route/angular-route.min.js.map',
          'styles/normalize.css' : 'normalize.css/normalize.css',
          'js/bootstrap.js' : 'bootstrap/dist/js/bootstrap.js',
          'styles/bootstrap.css' : 'bootstrap/dist/css/bootstrap.css',
          'styles/bootstrap.css.map' : 'bootstrap/dist/css/bootstrap.css.map'
        }
      }
    },

    mocha: {
      test: {
        src: 'tests/**/*.html'
      }
    },
    });

  grunt.registerTask('serve', ['connect:livereload','sass','watch']);
  grunt.registerTask('css', ['sass','cssmin','uncss']);
  grunt.registerTask('js', ['concat','uglify']);
  grunt.registerTask('production', ['sass,cssmin,uncss','uglify','imagemin']);
  
};
