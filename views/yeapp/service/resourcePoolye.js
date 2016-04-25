/**
 * Created by nangua on 16/4/25.
 */
myApp.factory('resourcePool', function ($resource,$http) {
    var factory = {
        //平台shop列表数据
        shopList:$resource('../views/yeapp/pages/plaform/platform.json').get=function () {
            return $http({
                method:"GET",
                url:"../views/yeapp/pages/platform/platform.json"
            })
        }
    };
    
    return factory;
});