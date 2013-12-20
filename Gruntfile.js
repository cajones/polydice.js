
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            tests: {
                files: ['tests/specs/**/*.js', 'lib/**/*.js'],
                tasks: ['mochaTest:test']
            }   
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: ['expect.js']
                },
                src: ['tests/specs/**/*.js']
            }
        }, 

        browserify: {
            dist: {
               files: {
                  'dist/polydice.js': ['lib/polydice.js'],
                }
            }
        },

        template: {
            dist: {
                files: {
                    'dist/index.html' : ['src/index.html.tpl']
                }
            }
        } 
    });

    grunt.registerTask('build', ['browserify', 'template']);
    grunt.registerTask('test', ['mochaTest:test']);
};