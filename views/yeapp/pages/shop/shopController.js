/**
 * Created by nangua on 16/4/25.
 */
myApp.controller('shopCtrl', ['$scope', 'productLists', function ($scope, productLists) {
    var vm = this;
    vm.productLists = productLists;
    console.log(vm.productLists)
    //加入购物车
    vm.addCart = function (product) {
        console.log('product+++', product);
        vm.productCart = product;
        $scope.$broadcast("popup-show", product);//像指令(也就是子作用域广播事件)
    };

        console.log('++++++');


}]);