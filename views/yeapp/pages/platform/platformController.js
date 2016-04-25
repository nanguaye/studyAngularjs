"use strict";
myApp.controller('platformCtrl',['$scope','shopLists','$state',function ($scope,shopLists,$state) {
     var vm=this;
     vm.shopLists=shopLists.shopLists
     //goShop 前往商铺页面
     vm.goShop=function (shopList) {
          $state.go('platform.shop',{shopId:shopList.shopId})
     }
}]);