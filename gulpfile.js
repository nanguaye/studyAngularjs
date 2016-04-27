// 引入 gulp
var gulp = require('gulp');
// 引入组件
var ip = require('ip');
var connect=require('gulp-connect');

var addr=ip.address();  //ip地址

gulp.task('ipServer',function () {
    connect.server({
        host:addr,
        root:'./',
        port:8090
    })
});


gulp.task('default', ['ipServer'], function () {
    console.log('启动ipServer服务');
});


















