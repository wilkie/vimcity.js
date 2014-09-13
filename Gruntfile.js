/*global module:false*/
module.exports = function(grunt) {

  // Helper methods
  function wrapModules(head, tail) {
    return head.concat(MODULE_LIST).concat(tail);
  }

  // Add modules:
  var MODULE_LIST = grunt.file.expand(['src/**/*.js',
                         '!src/vimcity.intro.js',
                         '!src/vimcity.const.js',
                         '!src/vimcity.core.js',
                         '!src/vimcity.outro.js']);

  var DIST_HEAD_LIST = [
      'src/vimcity.intro.js',
      'src/vimcity.const.js',
      'src/vimcity.core.js'
    ];

  // This is the same as DIST_HEAD_LIST, just without *.const.js (which is just
  // there UglifyJS conditional compilation).
  var DEV_HEAD_LIST = [
      'src/vimcity.intro.js',
      'src/vimcity.core.js'
    ];

  var TAIL_LIST = [
      'src/vimcity.init.js',
      'src/vimcity.outro.js'
    ];

  // Gets inserted at the top of the generated files in dist/.
  var BANNER = [
      '/*! <%= pkg.name %> - v<%= pkg.version %> - ',
      '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.author %> */\n'
    ].join('');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        options: {
          banner: BANNER
        },
        src: wrapModules(DIST_HEAD_LIST, TAIL_LIST),
        dest: 'dist/vimcity.js'
      },
      dev: {
        options: {
          banner: BANNER
        },
        src: wrapModules(DEV_HEAD_LIST, TAIL_LIST),
        dest: 'dist/vimcity.js'
      }
    },
    uglify: {
      dist: {
        files: {'dist/vimcity.min.js': ['dist/vimcity.js']}
      },
      options: {
        banner: BANNER
      }
    },
    jsdoc: {
      basic: {
        src: grunt.file.expand(['src/**/*.js', '!src/vimcity.intro.js', '!src/vimcity.outro.js']),
      }
    },
    jasmine: {
      src: grunt.file.expand(['src/**/*.js', '!src/vimcity.intro.js', '!src/vimcity.outro.js']),
      options: {
        specs: ['test/*Spec.js']
      }
    },
    jshint: {
      all_files: [
        'Gruntfile.js',
        'src/**/vimcity.!(intro|outro|const)*.js',
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.registerTask('default', [
      'jshint',
      'jasmine',
      'jsdoc',
      'build',
    ]);
  grunt.registerTask('build', [
      'concat:dist',
      'uglify:dist',
      'concat:dev'
    ]);
};

