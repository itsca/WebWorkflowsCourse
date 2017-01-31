var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee']; //Array of locations of coffee script files.
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	]; //Array of locations of js script files to unify(concat).

var sassSources = ['components/sass/style.sass']; //Array of locations of sass files to process(compass).


gulp.task('coffee', function() {
	gulp.src(coffeeSources) //Location of the coffee script.
		.pipe(coffee({bare : true}) //pipe it to coffee and safe wrappit.
			.on('error', gutil.log)) //listen for erros and log them instead of stoping terminal.
		.pipe(gulp.dest('components/scripts')) //pipe it to gulp to add the compile file to the scripts forlder.
});


gulp.task('js', function() {
	gulp.src(jsSources) //location of js scripts
		.pipe(concat('script.js')) //unify the scripts
		.pipe(browserify()) //add libraries and unify
		.pipe(gulp.dest('builds/development/js')) //export unify js to location.
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      css: 'builds/development/css', 
      sass: 'components/sass',
      image: 'builds/development/images',
      style: 'expanded'
    })
    .on('error', gutil.log))
}); 
//Exports sass docs to css pipe in to compass with the sass options(output location css:)




