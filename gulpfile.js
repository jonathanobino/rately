var gulp = require('gulp');
var prefixer = require('gulp-autoprefixer');
var scss = require('gulp-sass');
var conc_css = require('gulp-concat-css');



gulp.task('hello_world', function(){
	console.log("hello world");
});

gulp.task('css', function(){
	return gulp.src('./public/css/*.css')
	.pipe(prefixer())
	.pipe(conc_css('style.css'))
	.pipe(gulp.dest('./public/style'));
})

gulp.task('scss', function(){
	return gulp.src('./public/css/style.scss')
	.pipe(scss())
	.pipe(prefixer())
	.pipe(gulp.dest('./public/style'));
})

gulp.task('watch', function(){
	console.log('watching');
	gulp.watch('./public/css/*.css', ['css']);
})