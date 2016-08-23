/**
 * Created by nangua on 16/8/18.
 */
// todo 引入模块
var http = require('http');
var url = require('url');
// todo 模拟数据
// 引入首页的json
var platformJSON = require('./views/api/platform.json')
// 模拟一个数据对象
var _data = {platform: platformJSON}


// todo 创建一个服务
http.createServer(function (request, response) {
    var _url = url.parse(request.url, true)
    var _paramName = _url.query['type']

    // 当参数type 参数存在的时候.
    if (_paramName) {
        response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        console.log('type参数:', _paramName)
        response.write(JSON.stringify(_data[_paramName]))
        console.log('success!!')

    } else {
        response.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
        console.log('参数错误')
        // response.write(JSON.stringify('error'))
        response.write('error啦!!!!')
    }

    response.end();
}).listen(8088)
console.log('启动node服务器,开始监听8088端口')