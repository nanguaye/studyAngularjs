"use strict";
myApp.controller('platformCtrl',['$scope','shopLists','$state','$http',function ($scope,shopLists,$state,$http) {
     var vm=this;
     vm.shopLists=shopLists.data.shopLists
     //goShop 前往商铺页面
     vm.goShop=function (shopList) {
          $state.go('platform.shop',{shopId:shopList.shopId})
     }
}]);