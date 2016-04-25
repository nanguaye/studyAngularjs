myApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('','/platform');
    $stateProvider.state('platform', {
        url:'/platform',
        views:{
            '@':{
                templateUrl:'../views/yeapp/pages/platform/platform.html',
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
    
});