/**
 * Created by nangua on 16/4/28.
 */
myApp.controller('detailCtrl', ['resourcePool', '$stateParams', 'productDetails', function (resourcePool, $stateParams, productDetails) {

    var vm = this;
    console.log('+++++', productDetails)
    vm.productShop = productDetails.shop;
    vm.productItem = productDetails.item;
}]);