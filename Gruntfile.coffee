module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    src_path: "src"
    dist_path: "dist"
    sass:
      options:
        sourceMap: true
        includePaths: [
          "<%= src_path %>/sass"
        ]
      dist:
        files:
          "<%= dist_path %>/<%= pkg.name %>.css": "<%= src_path %>/sass/index.sass"
    autoprefixer:
      dist:
        src: "<%= dist_path %>/<%= pkg.name %>.css"
        dest: "<%= dist_path %>/<%= pkg.name %>.prefixed.css"
    cssmin:
      dist:
        files: [
          expand: true
          cwd: "<%= dist_path %>"
          src: ["*.prefixed.css", "!*.min.css"]
          dest: "<%= dist_path %>"
          ext: ".min.css"
        ]
    uglify:
      dist:
        files:
          "<%= dist_path %>/<%= pkg.name %>.min.js": "<%= dist_path %>/<%= pkg.name %>.js"

  grunt.loadNpmTasks "grunt-sass"
  grunt.loadNpmTasks "grunt-autoprefixer"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-cssmin"

  grunt.registerTask "default", ["sass:dist", "autoprefixer:dist", "cssmin","uglify:dist"]
