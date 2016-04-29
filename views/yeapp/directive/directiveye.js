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
        transclude: true,
        link: function (scope, element, attrs, controllers) {
            scope.$on('popup-show', function () {
                scope.show = true;//显示弹窗
            });
            //关闭function
            scope.close = function () {
                scope.$emit('popup-close');
                scope.show = false;//隐藏弹窗
            }
        }
    }
});

//shop页 轮播图指令 swipeimg  在指令中操作dom  
myApp.directive('swipeimg', function () {
    return {
        restrict: "AE",
        replace: true,
        link: function (scope, element) {
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

//弹出层错误提示 msg
myApp.directive('msg', function () {
    return {
        restrict: "E",
        templateUrl: "./yeapp/directive/alertService.html"
    }
});

//价格 price指令
myApp.directive('price', function () {
    return {
        restrict: "E",
        template: "<span style='color: #db5252' ng-transclude=''></span>",
        transclude: true
    }
});

//底部导航栏
angular.module('app').directive('bottomnav', function ($stateParams, $state) {
    return {
        restrict: "E",
        templateUrl: "./yeapp/directive/bottomnav.html",
        replace: true,
        link: function (scope, element, attrs, cotroller) {
            scope.goShop = function () {
                $state.go('platform.shop', {shopId: $stateParams.shopId})
            };
            //去个人中心
            scope.goUser = function () {
                $state.go('platform.user',{shopId: $stateParams.shopId})
            }
        }
    }
});