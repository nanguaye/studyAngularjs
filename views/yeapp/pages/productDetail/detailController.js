/**
 * Created by nangua on 16/4/28.
 */
myApp.controller('detailCtrl', ['resourcePool', '$stateParams', 'productDetails', function (resourcePool, $stateParams, productDetails) {
    var vm = this;
    vm.yeData = "[{startWeekDay:'1',endWeekDay:'4'}]";
    console.log('123', vm.yeData)

    console.log('+++++', productDetails)
    vm.productShop = productDetails.shop;
    vm.productItem = productDetails.item;
    vm.tabClick = function (num) {
        if (num === 1) {
            vm.tabIndex = 0
        } else if (num === 2) {
            vm.tabIndex = 1
        } else if (num === 3) {
            vm.tabIndex = 2
        }
    };
}]);