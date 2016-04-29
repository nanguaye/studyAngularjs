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