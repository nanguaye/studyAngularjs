// 引入 gulp
var gulp = require('gulp');
// 引入组件
var ip = require('ip');
var connect = require('gulp-connect');
var less = require('gulp-less')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var path = require('path')

// 编译less
gulp.task('test-less', function () {
    console.log('启动test-less服务')
    gulp.src('views/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css (输出)
});
// 合并，压缩文件
gulp.task('script', function () {
    console.log('script服务')
    gulp.src('./views/**/*.js')  // 匹配views文件夹下的所有js文件
        .pipe(concat('all.js'))   //合并到app.js文件
        .pipe(gulp.dest('./src/js'))  // 合并所有js文件到dist文件夹下
        .pipe(rename('all.min.js'))   //然后重命名压缩成all.min.js
        .pipe(uglify())
        .pipe(gulp.dest('./src/js'));//然后重命名后的all.min.js也输出到dist文件夹下
});
gulp.task('browser-sync', function () {
    console.log('启动browser-sync服务');
    var files = {
        server: {
            baseDir: "./"
        },
        /*server: './',  //这个服务启动在根目录!(这样 根目录下的东西我们都能调用)ps:也可以上面那样写*/
        open: 'external',  // 打开外部URL -必须在网上
        port: 1030,  // 端口号
        startPath: "/views/index.html" // 启动的时候 打开 views/index.html
    };
    browserSync.init(files);
});


gulp.task('reload', function () {
    console.log('触发reload服务');
    browserSync.reload(); // 刷新浏览器
});
gulp.task('watch', function () {
    console.log('触发watch服务');
    // __dirname 代表当前文件夹
    // path.join ()  进入到当前文件夹 然后当前文件夹下的views文件夹 下面的所有js文件
    var pjs = path.join(__dirname, './viwews/**/*.js');
    var pless = path.join(__dirname, './views/**/*.less');
    var phtml = path.join(__dirname, './views/**/*.html');
    gulp.watch(pjs, ['script', 'reload']); //监听 views文件夹下的的js文件,只要有变化 就执行script 然后刷新浏览器
    gulp.watch(pless, ['test-less', 'reload']);
    gulp.watch(phtml, ['reload']);
});

// 执行
gulp.task('default', ['test-less', 'script', 'browser-sync', 'watch'], function () {
    console.log("启动")
});


















