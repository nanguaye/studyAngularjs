// 引入 gulp
var gulp = require('gulp');
// 引入组件
var ip = require('ip');
var connect = require('gulp-connect');
var browserSync = require('browser-sync').create();

var addr = ip.address();  //ip地址

/*gulp.task('ipServer', function () {
    console.log('启动ipServer服务');
    connect.server({
        host: addr,
        root: './',
        port: 1030
    })
});*/
gulp.task('browser-sync', function () {
    console.log('启动browser-sync服务');
    browserSync.init({
    /*    server: {
            baseDir: "./"
        },*/
        server:'./',
        open: 'external',
        port: 1030,
        startPath: "/views/index.html"
    });
});

gulp.task('default', ['browser-sync'], function () {
 console.log("启动")
});


















