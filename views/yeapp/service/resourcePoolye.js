/**
 * Created by nangua on 16/4/25.
 */
myApp.factory('resourcePool', function ($resource, $http) {
    var factory = {
        shopListsRes: $resource('api/platform?type=platform'),
        productListsRes:$resource('api/shop.json'),
        productDetailsRes:$resource('api/productDetail.json'),
        userRes:$resource('api/user.json')
    };

    return factory;
});