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
                    return resourcePool.productListsRes.get({shopId: shopId});
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
                productDetails: function ($stateParams,resourcePool) {
                    var productId = $stateParams.productId; //获取该商品的id
                    return resourcePool.productDetailsRes.get({productId: productId});
                }
            }
        })

});