var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyHTML = require('gulp-minify-html'),
	jsonminify = require('gulp-jsonminify'),
	concat = require('gulp-concat');

var env,
	coffeeSources,
	jsSources,
	sassSources,
	htmlSources,
	jsonSources,
	outputDir,
	sassStyle;


env = process.env.NODE_ENV || 'development';

if (env ==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
}else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
};


coffeeSources = ['components/coffee/tagline.coffee']; //Array of locations of coffee script files.
jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	]; //Array of locations of js script files to unify(concat).

sassSources = ['components/sass/style.sass']; //Array of locations of sass files to process(compass).
htmlSources = [outputDir + '*.html']; //Array of locations of html files.
jsonSources = [outputDir + 'js/*.json']; //Array of locations of json files.

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
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js')) //export unify js to location.
		.pipe(connect.reload()) //reload the server with the connect task
});


//Exports sass docs to css pipe in to compass with the sass options(output location css:)
gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      css: outputDir + 'css', 
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
}); 

//Fix to Compass bug not pasing the css to other pipes, everything that need to be made after the CSS is created is piped here.
gulp.task('realoadMasterCss', function() {
  gulp.src(outputDir + 'css/style.css')
    .pipe(connect.reload()) //reload the server with the connect task
}); 

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
  	.pipe(gulpif(env === 'production', minifyHTML()))
  	.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload()) //reload the server with the connect task
}); 

gulp.task('json', function() {
  gulp.src('builds/development/js/*.json')
  	.pipe(gulpif(env === 'production', jsonminify()))
  	.pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
    .pipe(connect.reload()) //reload the server with the connect task
}); 

gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/js/*.json', ['json']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(outputDir + 'css/style.css', ['realoadMasterCss']); //watcher for the css-compass fix.
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});


//default task runs when calling just gulp in cmd
gulp.task('default', ['coffee', 'js', 'html', 'json', 'connect', 'watch', 'compass']);


