var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync').create(),
		reload = browserSync;

// Config for variable settings
var config = {
	bowerDir: 'bower_components'
}

gulp.task('bower', function () {
	return bower()
		.pipe(gulp.dest(config.bowerDir))
});


// Moving FontAwesome Icons to New Folder
gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('src/fonts')); 
});

// Moving FontAwesome CSS file to New Folder
gulp.task('fa-styles', ['icons'], function () {
	return gulp.src(config.bowerDir + '/fontawesome/css/**.*') 
        .pipe(gulp.dest('src/fonts/css')); 
});

//BrowserSync for starting static server
gulp.task('browserSync', ['sass'], function () {
	browserSync.init({
		server: "./src",
		// proxy: 'basic.com'
	});

	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
	gulp.src('src/sass/*.scss')
		.pipe(sass({
			loadPath: [
				config.bowerDir + '/fontawesome/scss'
			]
		}))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['browserSync']);
