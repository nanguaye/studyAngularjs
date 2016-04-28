/**
 * Created by nangua on 16/4/28.
 */


myApp.service('alertService', function ($rootScope, $compile,$timeout) {

    this.error = function (name) {
        console.log("alert方法执行")

        var msgDom = angular.element('<msg></msg>');
        var newScope = $rootScope.$new(); //创建一个新的作用域,用来和msgDom绑定
        var msgDomScope = $compile(msgDom)(newScope);   //编译

        $('body').append(msgDomScope); //在body里面添加编译好的这指令

        newScope.msg = name; //传进来的name值赋值给指令中的msg
        newScope.msgshow = true; //显示弹出层

        // setTimeout(function () {   //2s后 隐藏
        //     console.log("dsadasdasds");
        //     newScope.msgshow = false; //隐藏弹出层
        //     newScope.$apply(); //手动触发,因为 我们的setTimeout 是原生的,html里的msgshow的值要变化 我们这边需要手动触发一下
        //     //具体的可以去了解一下$digest()     我们可以同timeout 这样就会自动触发$digest()
        // }, 2000)
        //
        $timeout(function () {
            newScope.msgshow = false; //隐藏弹出层
        },1000)
    }
});
