/**
 * Created by nangua on 16/4/25.
 */
myApp.factory('resourcePool', function ($resource, $http) {
    var factory = {
        shopListsRes: $resource('./yeapp/pages/platform/platform.json'),
        productListsRes:$resource('./yeapp/pages/shop/shop.json')
    };

    return factory;
});