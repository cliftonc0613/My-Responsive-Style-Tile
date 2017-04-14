// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    stripdebug = require('gulp-strip-debug'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    base64 = require('gulp-base64');
imagemin = require('gulp-imagemin');
    browsersync = require('browser-sync');

// Enter URL of your local server here
// Example: 'http://localwebsite.dev'
var URL = 'http://responsivestyletiles.dev';

// ===== Variable for output directory
var outputDir   = '/build/';

// error function for plumber
var onError = function (err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};

// Browser definitions for autoprefixer
var AUTOPREFIXER_BROWSERS = [
    'last 3 versions',
    'ie >= 8',
    'ios >= 6',
    'android >= 4.4',
    'bb >= 10'
];

// Datestamp for cache busting
var getStamp = function() {
    var myDate = new Date();

    var myYear = myDate.getFullYear().toString();
    var myMonth = ('0' + (myDate.getMonth() + 1)).slice(-2);
    var myDay = ('0' + myDate.getDate()).slice(-2);
    var mySeconds = myDate.getSeconds().toString();

    var myFullDate = myYear + myMonth + myDay + mySeconds;

    return myFullDate;
};

// Browsersync task
gulp.task('browser-sync', ['build'], function() {

    var files = [
        '**/*.html',
        'assets/images/**/*.{png,jpg,gif}',
    ];

    browserSync.init(files, {
        // Proxy address
        proxy: URL

        // Port #
        // port: PORT
    });
});

//BrowserSync reload all Browsers
gulp.task('browsersync-reload', function () {
    browsersync.reload();
});

// Optimize Images task
gulp.task('images', function() {
    return gulp.src('./assets/images/**/*.{gif,jpg,png}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
        }))
        .pipe(gulp.dest('./assets/' + outputDir + '/images/'))
        .pipe(browsersync.reload({ stream:true }))
        .pipe(notify({ message: 'Optimize Images task complete' }));
});

// CSS task
// Compile Our Sass
gulp.task('css', function() {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./assets/' + outputDir + '/css/'))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(base64({ extensions:['svg'] }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./assets/' + outputDir + '/css/min'))
        .pipe(browsersync.reload({ stream:true }))
        .pipe(notify({ message: 'CSS Styles task complete' }));
});

// Lint JS task
gulp.task('jslint', function() {
    return gulp.src('./assets/js/modules/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({ message: 'Lint task complete' }));
});

// Watch task
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('./assets/scss/**/*', ['css']);
    gulp.watch('./assets/javascript/**/*', ['jshint', 'scripts', 'browsersync-reload']);
});

// Generic tasks
gulp.task('default', ['css', 'watch']);