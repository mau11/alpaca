module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'server.js', 'controllers/**/*.js', 'db/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      browserifyApp: {
        files: ['src/**/*.js', '!src/racer/*.js', '!src/util/quiz.js', '!src/HexGL/**/*.js', '!src/shooter/**/*.js'],
        tasks: ['browserify:dist']
      },
      browserifyGame: {
        files: ['src/racer/racer.js', 'src/util/quiz.js'],
        tasks: ['browserify:game']
      }
    },
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              presets: ['es2015', 'react']
            }]
          ],
          watch: true,
          browserifyOptions: {
            debug: true,
            insertGlobals: true
          }
        },
        src: ['src/**/*.js', '!src/racer/*.js', '!src/util/quiz.js', '!src/HexGL/**/*.js', '!src/shooter/**/*.js'],
        dest: 'public/bundle.js'
      },
      game : {
         options: {
           transform: [['babelify', {presets: ['es2015']}]]
        },
        src: ['src/racer/racer.js', 'src/util/quiz.js'],
        dest: 'public/racer.build.js'
      }
    },
    nodemon: { dev: {
        script: 'server.js'
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master',
      },
      database: {
        command: [
          'mysql.server start',
          'mysql -u root -e "drop database crashcourse; create database crashcourse"'
        ].join('&&')
      },
      seed: {
        command: 'node seed.js'
      }
    }

  });

  // loading modules
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');


  // additional tasks
  grunt.registerTask('link', ['jshint', 'watch']);

  grunt.registerTask('build', ['browserify']);

  grunt.registerTask('default', ['build','concurrent:target', 'shell:database', 'shell:seed']);
  grunt.registerTask('build-nodb', ['build','concurrent:target']);

};
