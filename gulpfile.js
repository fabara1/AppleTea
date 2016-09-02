var 
	gulp = require('gulp'), 
	compass = require('gulp-compass'), 
	jade = require('gulp-jade'), 
	browserSync = require('browser-sync'), 
	plumber = require('gulp-plumber'); 

var 
	paths = { 
	jade : { 
	location : 'jade-files/**/*.jade', //следить за файлами 
	compiled : 'jade-files/pages/*.jade', //путь для страниц jade то что компилим
	destination : 'app' 
}, 

sass : { 
	location : 'sass-files/**/*.scss', 
	entryPoint : 'app/css/main.css' 
}, 

compass : { 
	configFile : 'config.rb', 
	cssFolder : 'app/css', 
	sassFolder : 'sass-files', 
	imgFolder : 'images for sprites' 
}, 

browserSync : { //модуль отвечает за обновленеие сайта
	baseDir : 'app', 
	watchPaths : ['app/*.html', 'app/css/**/*css', 'app/js/**/*.js'] 
} 
} 


gulp.task('compass', function () { 
	gulp.src(paths.sass.location) 
	.pipe(plumber()) 
	.pipe(compass({ 
		config_file: paths.compass.configFile, 
		css: paths.compass.cssFolder, 
		sass: paths.compass.sassFolder, 
		image: paths.compass.imgFolder 
	})); 
}); 

gulp.task('sync', function () { 
	browserSync.init({ 
		server: { 
		baseDir: paths.browserSync.baseDir 
	} 
	}); 
}); 

gulp.task('watch', function () { 
	gulp.watch(paths.jade.location, ['jade']); 
	gulp.watch(paths.sass.location, ['compass']); 
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload); 
}); 

gulp.task('default', ['compass', 'sync', 'watch']);