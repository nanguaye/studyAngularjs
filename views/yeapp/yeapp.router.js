myApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('','/platform');
    $stateProvider.state('platform', {
        url:'/platform',
        views:{
            '@':{
                templateUrl:'./yeapp/pages/platform/platform.html',
                controller:'platformCtrl',
                controllerAs: 'vm'
            }
        },
        resolve:{
            shopLists:function (resourcePool) {
              return  resourcePool.shopList();
            }
        }
        
    })
        .state('platform.shop',{
            url:'/shop?shopId',
            views:{
                '@':{
                    templateUrl:'./yeapp/pages/shop/shop.html',
                    controller:'',
                    controllerAs:'vm'
                }
            }
        })
    
});