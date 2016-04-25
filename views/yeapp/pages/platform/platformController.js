"use strict";
myApp.controller('platformCtrl',['$scope','shopLists',function ($scope,shopLists) {
     var vm=this;
     vm.shopLists=shopLists.data.shopLists
     console.log(vm.shopLists)
}]);