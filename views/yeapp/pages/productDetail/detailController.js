/**
 * Created by nangua on 16/4/28.
 */
myApp.controller('detailCtrl', ['resourcePool', '$stateParams', 'productDetails', function (resourcePool, $stateParams, productDetails) {

    var vm = this;
    console.log('+++++', productDetails)
    vm.productShop = productDetails.shop;
    vm.productItem = productDetails.item;

    vm.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (success) {
              alert(1111+success)
            },function (error) {
                alert(2222+error)
            });
        }
        else {
            alert('nononono')
        }

    }
    vm.getLocation()()


}]);