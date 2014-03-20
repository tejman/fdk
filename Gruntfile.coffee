path = require "path"

module.exports = (grunt)->
  _ = grunt.util._
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)

  grunt.initConfig {
    
    uglify: {},
    cssmin: {},
    watch: {},

  }