// https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/servers.md

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');


var apiProxy = proxy('/api', {
    target: 'http://i.ix-test.com:8080',
    changeOrigin: true   // for vhosted sites
});
// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            middleware: [apiProxy],
        },
        port: 8300,

    });
    gulp.watch('./index.**').on('change', browserSync.reload)
});


gulp.task('default',['browser-sync'])