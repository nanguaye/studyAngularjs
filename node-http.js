/**
 * Created by nangua on 16/8/18.
 */

var http = require('http')
var url = require('url')

http.createServer(function (request,response) {
    var _url = url.parse(request.url,true)
    var _paramName = _url.query['type']
        if (_paramName === 'platform') {
        response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        console.log('参数正确')
        // response.write(JSON.stringify('success'))
        response.write('success!!ok')
    }else {
        response.writeHead(400, {'Content-Type': 'text/plain;charset=utf-8'});
        console.log('参数错误')
        // response.write(JSON.stringify('error'))
        response.write('error啦!!!!')
    }

    response.end();
}).listen(8088)
console.log('启动node服务器,开始监听8088端口')