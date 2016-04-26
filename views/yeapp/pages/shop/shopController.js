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


    //选择规格
    vm.specData = [];//初始化
    //清除同一spec 没被选中的规格 状态
    vm.clearSpec=function (specId) {
        for(var i=0;i<vm.productCart.specLists.length;i++){
            if(vm.productCart.specLists[i].id===specId){
                for(var k=0;k<vm.productCart.specLists[i].specValues.length;k++){
                    vm.productCart.specLists[i].specValues[k].checked=false;
                }
            }
        }
    };
    vm.selectSku = function (spec, specValue) {
        specValue.checked = true;
        var oneSpec = {};//初始化
        oneSpec.id = spec.id;
        oneSpec.specName = spec.specName;
        oneSpec.valueId = specValue.id;
        oneSpec.valueName = specValue.specVal;
        console.log('当前点击的规格', oneSpec)
        var boo = true;
        for (var i = 0; i < vm.specData.length; i++) {
            if (vm.specData[i].id === spec.id) {
                boo = false;//当一个类别(比如口味 分量) 已经存在 那说明这个类别的规格议价选了 所以不push到数组里了
                if (vm.specData[i].valueId === specValue.id) {
                    console.log('同一个spec和value');
                    vm.specData.splice(i, 1);//移除
                    specValue.checked = false;
                    console.log('移除后', vm.specData);
                }else {
                    // 同一个spec不同value,移除原有的spec value,添加新的value
                    vm.specData.splice(i, 1);//移除
                    vm.clearSpec(spec.id);
                    specValue.checked = true;//当前规格选中状态 红色
                    vm.specData.push(oneSpec);//添加当前的
                    console.log('同一个spec不同value',vm.specData);

                }
            }
        }

        if (boo) {
            specValue.checked = true;
            vm.specData.push(oneSpec);
            console.log(vm.specData);
        }
        //判断规格是否都已经选好
        if(vm.specData.length===vm.productCart.specLists.length){
             console.log('所有规格都选好了')
        }else{
             console.log('还有规格没有选')
        }


    };

}]);