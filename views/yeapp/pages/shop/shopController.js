/**
 * Created by nangua on 16/4/25.
 */
myApp.controller('shopCtrl',['$scope','productLists',function ($scope,productLists) {
    var vm=this;
    vm.productLists=productLists;
     console.log(vm.productLists)
}]);