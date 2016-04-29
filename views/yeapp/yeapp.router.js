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
                        console.log("value",value)
                        return value
                    }).catch(function () {
                         console.log("error")
                    })

                }
            }
        })

});