var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee');

var coffeeSources = ['components/coffee/tagline.coffee']; //Array of locations of coffee script files.

gulp.task('coffee', function() {
	gulp.src('coffeeSources') //Location of the coffee script.
		.pipe(coffee({bare : true}) //pipe it to coffee and safe wrappit.
			.on('error', gutil.log)) //listen for erros and log them instead of stoping terminal.
		.pipe(gulp.dest('components/scripts')) //pipe it to gulp to add the compile file to the scripts forlder.
});