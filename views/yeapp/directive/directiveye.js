/**
 * Created by nangua on 16/4/25.
 */


/*为了方便,所有的指令都写在这个directiveye js文件里面.*/

//platform页--item
myApp.directive('item', function () {
    return {
        restrict: 'E',
        scope: {
            shopList: '='   //隔绝作用域
        },
        templateUrl: "./yeapp/directive/itemTemplate.html"
    }
});

//shop页快捷购物车弹窗
myApp.directive('popup', function () {
    return {
        restrict: "E",
        templateUrl: "./yeapp/directive/popup.html",
        link: function (scope, element, attrs, controllers) {
            scope.$on('popup-show', function () {
                scope.show = true;//显示弹窗
            });
            //关闭function
            scope.close = function () {
                scope.show = false;//隐藏弹窗
            }
        }
    }
});

//shop页 轮播图指令 carouselimg
myApp.directive('swipeimg', function ($timeout) {
    return {
        restrict: "E",
        templateUrl: './yeapp/directive/swipeimg.html',
        replace: true,
        link: function (scope) {
            console.log("------")
            setTimeout(function () {
                new Swiper('.swiper-container', {
                    paginationClickable: true,
                    autoplay: 2000,
                    loop: true
                })
            })
        }

    }
});