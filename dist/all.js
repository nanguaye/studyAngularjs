var myApp=angular.module('app',['ui.router','ngResource','ngAnimate']);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/platform');
    $stateProvider.state('platform', {
            url: '/platform',
            views: {
                '@': {
                    templateUrl: './yeapp/pages/platform/platform.html',
                    controller: 'platformCtrl',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                shopLists: function (resourcePool) {
                    return resourcePool.shopListsRes.get({})
                }
            }

        })
        .state('platform.shop', {
            url: '/shop?shopId',
            views: {
                '@': {
                    templateUrl: './yeapp/pages/shop/shop.html',
                    controller: 'shopCtrl',
                    controllerAs: 'vm'
                }
            },
            //这里可以根据shop页面的shopId去请求该商店的数据,这里为了方便所以用模拟数据..见谅
            resolve: {
                productLists: function (resourcePool, $stateParams) {
                    var shopId = $stateParams.shopId;
                    return resourcePool.productListsRes.get({shopId: shopId}).$promise.then(function (value) {
                        return value
                    })
                }
            }
        })
        .state('platform.shop.productDetail', {
            url: '/productDetail?productId',
            views: {
                '@': {
                    templateUrl: './yeapp/pages/productDetail/productDetail.html',
                    controller: 'detailCtrl',
                    controllerAs: 'vm'
                }
            },
            //这里可以根据shop页面的传过来的productId去请求该商品的的数据,这里为了方便所以用json模拟数据..见谅

            resolve: {
                productDetails: function ($http, resourcePool) {
                    //方法1
                    // return $http({
                    //         method:"GET",
                    //         url:"./yeapp/pages/productDetail/productDetail.json"
                    //     }).then(function (data) {
                    //         return data.data;
                    //     });
                    //方法2 用资源池
                    return resourcePool.productDetailsRes.get().$promise.then(function (value) {
                        console.log("value", value)
                        return value
                    }).catch(function () {
                        console.log("error")
                    })

                }
            }
        })
        //个人中心
        .state('platform.user', {
            url: '/user?shopId',
            views: {
                '@': {
                    templateUrl: './yeapp/pages/user/user.html',
                    controller: "userCtrl",
                    controllerAs: "vm"
                }
            },
            //去请求该shop下 个人中心的信息,(参数 shopId),这里我们只需要去请求这个接口即可!后端会去从cookies里判断是否登录
            //登录的情况下,那么会把该shop下 会员信息返回给我们 否则直接返回个空值 或者 erro也可以
            resolve: {
                userInf: function (resourcePool,$stateParams,$state) {
                    return resourcePool.userRes.get().$promise.then(function (res) {
                        console.log('res', res);
                        if (res.state === "error") {
                            console.log('请登录');
                            $state.go('platform.login',{shopId:$stateParams.shopId})
                        }
                        return res;
                    })
                }
            }
        })
        //登录页面
        .state('platform.login', {
            url: '/login?shopId',
            views: {
                '@': {
                    templateUrl: './yeapp/pages/login/login.html',
                    controller: "loginCtrl",
                    controllerAs: "vm"
                }
            }
        })

});
/**
 * Created by nangua on 16/4/29.
 */

myApp.run(function () {

});
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

/**
 * Created by nangua on 16/4/25.
 */
myApp.factory('resourcePool', function ($resource, $http) {
    var factory = {
        shopListsRes: $resource('./yeapp/pages/platform/platform.json'),
        productListsRes:$resource('./yeapp/pages/shop/shop.json'),
        productDetailsRes:$resource('./yeapp/pages/productDetail/productDetail.json'),
        userRes:$resource('./yeapp/pages/user/user.json')
    };

    return factory;
});
"use strict";
myApp.controller('platformCtrl',['$scope','shopLists','$state',function ($scope,shopLists,$state) {
     var vm=this;
     vm.shopLists=shopLists.shopLists
     //goShop 前往商铺页面
     vm.goShop=function (shopList) {
          $state.go('platform.shop',{shopId:shopList.shopId})
     }
}]);
/**
 * Created by nangua on 16/4/29.
 */
myApp.controller('loginCtrl',function () {
    
});

/**
 * Created by nangua on 16/4/25.
 */
myApp.controller('shopCtrl', ['$scope', 'productLists', 'alertService', '$state', '$timeout', function ($scope, productLists, alertService, $state, $timeout) {


/*    if (window.navigator.onLine == true) {
        console.log('+++++')
        alert("已连接");
    } else {
        alert('未连接')
    }*/
/*    $.ajaxSetup({
        timeout: 1, // 1秒超时
        error: function(request, status, maybe_an_exception_object) {
            if(status == 'timeout'){
                alert("网断了");
            }else {
                console.log('wu!!')
            }
        }
    });*/


    //第一次进入这个页面的时候 置顶
    $(window).scrollTop(0);

    var vm = this;
    vm.productLists = productLists;
    console.log(vm.productLists);
    //打开ewm弹窗
    vm.openEwm = function () {
        vm.ewmShow = true;
        $timeout(function () {
            vm.qrcode = new QRCode('qrcode', {
                text: 'your content',
                width: 180,
                height: 180,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        })

    }
    //关闭二维码弹窗
    vm.closeEwm = function () {
        vm.ewmShow = false;
    }
    //前往当前商品的详情页
    vm.goDetail = function (product) {
        $state.go('platform.shop.productDetail', { productId: product.code })
    };
    //加入购物车
    vm.addCart = function (product) {
        event.stopPropagation();//阻止父层的冒泡事件;
        console.log('product+++', product);
        vm.productCart = product;
        $scope.$broadcast("popup-show", product);//像指令(也就是子作用域广播事件)
        vm.specData = [];//初始化选中的规格数组;
        // vm.clearAllSpec();// 清除所有规格的选中状态
    };
    //加入购物车弹窗关闭
    $scope.$on('popup-close', function () {
        console.log('弹窗关闭 广播事件');
        vm.specData = [];//初始化选中的规格数组;
        vm.clearAllSpec();// 清除所有规格的选中状态
    });

    //选择规格
    //清除所有规格选中状态
    vm.clearAllSpec = function () {
        for (var i = 0; i < vm.productCart.specLists.length; i++) {
            for (var j = 0; j < vm.productCart.specLists[i].specValues.length; j++) {
                console.log(vm.productCart.specLists[i].specValues[j].specVal);
                vm.productCart.specLists[i].specValues[j].checked = false;
            }
        }
    };
    //清除同一spec 没被选中的规格 状态
    vm.clearSpec = function (specId) {
        for (var i = 0; i < vm.productCart.specLists.length; i++) {
            if (vm.productCart.specLists[i].id === specId) {
                for (var k = 0; k < vm.productCart.specLists[i].specValues.length; k++) {
                    vm.productCart.specLists[i].specValues[k].checked = false;
                }
            }
        }
    };
    vm.selectSku = function (spec, specValue) {
        specValue.checked = true;
        var oneSpec = {};//初始化
        oneSpec.id = spec.id;
        oneSpec.specName = spec.specName;
        oneSpec.valueId = specValue.id;
        oneSpec.valueName = specValue.specVal;
        var boo = true;
        for (var i = 0; i < vm.specData.length; i++) {
            if (vm.specData[i].id === spec.id) {
                boo = false;//当一个类别(比如口味 分量) 已经存在 那说明这个类别的规格议价选了 所以不push到数组里了

                //当点击的的是同一spec 同一个value
                if (vm.specData[i].valueId === specValue.id) {
                    vm.specData.splice(i, 1);//移除
                    specValue.checked = false;
                    console.log('同一个spec和value', vm.specData);
                }
                else {
                    // 同一个spec不同value,移除原有的spec value,添加新的value
                    vm.specData.splice(i, 1);//移除
                    vm.clearSpec(spec.id);
                    specValue.checked = true;//当前规格选中状态 红色
                    vm.specData.push(oneSpec);//添加当前的
                    console.log('同一个spec不同value', vm.specData);
                    break; //结束循环 要是不结束的话 会因为新push进去的对象 然后走 同一spec和同一个value这里的代码

                }
            }
        }

        if (boo) {
            specValue.checked = true;
            vm.specData.push(oneSpec);
            // console.log('++++++',vm.specData);
        }

    };
    //确认加入购物车
    vm.addCartComfirm = function () {
        //判断规格是否都已经选好
        if (vm.specData.length === vm.productCart.specLists.length) {
            console.log('所有规格都选好了');
        } else {
            alertService.error('请选择规格');
        }

    }
}]);
/**
 * Created by nangua on 16/4/28.
 */
myApp.controller('detailCtrl', ['resourcePool', '$stateParams', 'productDetails', function (resourcePool, $stateParams, productDetails) {

    var vm = this;
    console.log('+++++', productDetails)
    vm.productShop = productDetails.shop;
    vm.productItem = productDetails.item;
    vm.tabClick = function (num) {
        if (num === 1) {
            vm.tabIndex = 0
        } else if (num === 2) {
            vm.tabIndex = 1
        } else if (num === 3) {
            vm.tabIndex = 2
        }
    };
}]);
/**
 * Created by nangua on 16/4/29.
 */
myApp.controller('userCtrl',['userInf','$scope',function (userInf,$scope) {
     console.log('+++',userInf)
}]);