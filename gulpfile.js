var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee']; //Array of locations of coffee script files.
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	]; //Array of locations of js script files to unify(concat).

gulp.task('coffee', function() {
	gulp.src(coffeeSources) //Location of the coffee script.
		.pipe(coffee({bare : true}) //pipe it to coffee and safe wrappit.
			.on('error', gutil.log)) //listen for erros and log them instead of stoping terminal.
		.pipe(gulp.dest('components/scripts')) //pipe it to gulp to add the compile file to the scripts forlder.
});


gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('builds/development/js'))
});