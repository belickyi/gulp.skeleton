"use strict";

var 
	gulp                      = require('gulp'), 
    plumber                   = require('gulp-plumber'),
    del                       = require('del'),
    notify                    = require('gulp-notify'),
    watch                     = require('gulp-watch'), 
    pug                       = require('gulp-pug'),
    sass                      = require('gulp-sass'),
    prefixer                  = require('gulp-autoprefixer'),
    cssmin                    = require('gulp-clean-css'),
    rename                    = require('gulp-rename'),
    imagemin                  = require('gulp-imagemin'),
    imageminJpegRecompress    = require('imagemin-jpeg-recompress'),
    pngquant                  = require('imagemin-pngquant'),
    browserSync               = require('browser-sync').create();

//pug
gulp.task('pug', function () {
  return gulp.src('src/*.pug')
  .pipe(plumber({ errorHandler: function(err) {
      notify.onError({
          title: "Gulp error in " + err.plugin,
          message:  err.toString()
      })(err);
  }}))
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('public'))
  .pipe(browserSync.reload({stream:true})); 
});

//style
gulp.task('style', function () {
  return gulp.src('src/style/style.sass') 
  .pipe(plumber({ errorHandler: function(err) {
      notify.onError({
          title: "Sass error in " + err.plugin,
          message:  err.toString()
      })(err);
  }}))
  .pipe(sass({includePaths: require('node-normalize-scss').includePaths}).on('error', sass.logError))
  .pipe(cssmin())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest('public/css'))
  .pipe(browserSync.reload({stream:true}));
});

//js
gulp.task('js', function () {
  return gulp.src('src/js/*.js') 
  .pipe(gulp.dest('public/js'))
  .pipe(browserSync.reload({stream: true})); 
});

//image
gulp.task('image', function () {
  return gulp.src('src/images/**/*.{jpg,png,jpeg,svg}') 
  .pipe(plumber())
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imageminJpegRecompress({
      progressive: true,
      loops: 5,
      min: 70,
      max: 90,
      quality:'high' 
    }),
    imagemin.optipng({optimizationLevel: 3}),
    pngquant({quality: '45-85', speed: 5})
  ]))
  .pipe(gulp.dest('public/images')) 
  .pipe(browserSync.reload({stream: true})); 
});


//clean dir
gulp.task('cleandir', function() { return del.sync('public'); }); 

//watch
gulp.task('watch', function(){
  watch(['src/*.pug'], function(event, cb) {
    gulp.start('pug');
  }); 
  watch(['src/style/*.sass'], function(event, cb) {
    gulp.start('style');
  }); 
  watch(['src/js/*.js'], function(event, cb) {
    gulp.start('js');
  });
  watch(['src/images/**/*.{jpg,png,jpeg,svg}'], function(event, cb) {
    gulp.start('image');
  });
});

//build
gulp.task('build', ['cleandir', 'pug', 'style', 'js', 'image']);

//run server after build
gulp.task('runServer', ['build'], function(){
  browserSync.init({
    server: {
      baseDir: "public",
      index: "index.html"
    },
    port: 8080,
    notify: false,
    logPrefix: "frontend_dev"
  });
  console.log('Сервер работает по адресу http://localhost:8080');
});

// default
gulp.task('default', ['runServer', 'watch']);
