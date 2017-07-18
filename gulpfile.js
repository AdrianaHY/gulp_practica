var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
var browserSync = require('browser-sync').create();

var rutas = {
  html: "./src/index.html",
  scss: "./src/assets/scss/style.scss",
  js: "./src/assets/app.js"
}

//crear tareas
gulp.task('preparandoHTML', function(){
    console.log(rutas.html)
    gulp.src(rutas.html)
    .pipe(gulp.dest('./public'))
});

gulp.task('preparandoCSS', function(){
  gulp.src(rutas.scss)
  .pipe(sass({
    outputStyle:"compressed"
  }))
  .on('error', sass.logError)
  .pipe(gulp.dest('./public'))
});

gulp.task('preparandoJS', function(){
  gulp.src(rutas.js)
  .pipe(uglify())
  .pipe(obfuscate())
  .pipe(gulp.dest('./public'))
});
//tareas para watch, tienen tres parametro:
//nombre de tarea, función que tenemos antes y la indicación
gulp.task('html-watch',['preparandoHTML'], function(done){
  //el reload es para que recargue la página isn necesidad de hacerlo manualmente
  browserSync.reload();
  done();
});
gulp.task('scss-watch', ['preparandoCSS'], function(done){
  browserSync.reload()
  done();
});
gulp.task('js-watch', ['preparandoJS'], function(done){
  browserSync.reload()
  done();
});

//esto es para levantar el servidor
gulp.task('serve', function(){
  browserSync.init({
    server:{
      baseDir: "./public"
    }
  });
  //para que esté revisando los cambios y actualizando
  gulp.watch(rutas.html,['html-watch']);
  gulp.watch(rutas.scss, ['scss-watch']);
  gulp.watch(rutas.js, ['js-watch']);
});
