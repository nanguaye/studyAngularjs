"use strict";
myApp.controller('platformCtrl',['$scope','shopLists','$state',function ($scope,shopLists,$state) {
     var vm=this;
     vm.shopLists=shopLists.data.shopLists
     console.log(vm.shopLists)
     //goShop 前往商铺页面
     vm.goShop=function (shopList) {
           console.log('前往shop',shopList)
          $state.go('platform.shop',{shopId:shopList.shopId})
     }
}]);