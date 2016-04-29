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