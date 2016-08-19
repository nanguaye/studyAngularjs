"use strict";
myApp.controller('platformCtrl',['$scope','shopLists','$state','$http',function ($scope,shopLists,$state,$http) {
     var vm=this;
     vm.shopLists=shopLists.shopLists
     //goShop 前往商铺页面
     vm.goShop=function (shopList) {
          $state.go('platform.shop',{shopId:shopList.shopId})
     }
     $http({
          url:'http://192.168.146.43:1030/api',
          method:'GET',
          params:{
               'type':'platform'
          }
     }).success(function(data,header,config,status){
//响应成功
     }).error(function(data,header,config,status){
//处理响应失败
     });
}]);