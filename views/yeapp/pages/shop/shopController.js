/**
 * Created by nangua on 16/4/25.
 */
myApp.controller('shopCtrl', ['$scope', 'productLists', 'alertService', '$state', '$timeout', function ($scope, productLists, alertService, $state, $timeout) {

    //第一次进入这个页面的时候 置顶
    $(window).scrollTop(0);

    var vm = this;
    vm.productLists = productLists;
    console.log(vm.productLists);
    //打开ewm弹窗
    vm.openEwm = function () {
        vm.ewmShow = true;
        $timeout(function () {
            vm.qrcode = new QRCode('qrcode', {
                text: 'your content',
                width: 180,
                height: 180,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        })

    }
    //关闭二维码弹窗
    vm.closeEwm = function () {
        vm.ewmShow = false;
    }
    //前往当前商品的详情页
    vm.goDetail = function (product) {
        $state.go('platform.shop.productDetail', { productId: product.code })
    };
    //加入购物车
    vm.addCart = function (product) {
        event.stopPropagation();//阻止父层的冒泡事件;
        console.log('product+++', product);
        vm.productCart = product;
        $scope.$broadcast("popup-show", product);//像指令(也就是子作用域广播事件)
        vm.specData = [];//初始化选中的规格数组;
        // vm.clearAllSpec();// 清除所有规格的选中状态
    };
    //加入购物车弹窗关闭
    $scope.$on('popup-close', function () {
        console.log('弹窗关闭 广播事件');
        vm.specData = [];//初始化选中的规格数组;
        vm.clearAllSpec();// 清除所有规格的选中状态
    });

    //选择规格
    //清除所有规格选中状态
    vm.clearAllSpec = function () {
        for (var i = 0; i < vm.productCart.specLists.length; i++) {
            for (var j = 0; j < vm.productCart.specLists[i].specValues.length; j++) {
                console.log(vm.productCart.specLists[i].specValues[j].specVal);
                vm.productCart.specLists[i].specValues[j].checked = false;
            }
        }
    };
    //清除同一spec 没被选中的规格 状态
    vm.clearSpec = function (specId) {
        for (var i = 0; i < vm.productCart.specLists.length; i++) {
            if (vm.productCart.specLists[i].id === specId) {
                for (var k = 0; k < vm.productCart.specLists[i].specValues.length; k++) {
                    vm.productCart.specLists[i].specValues[k].checked = false;
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
        var boo = true;
        for (var i = 0; i < vm.specData.length; i++) {
            if (vm.specData[i].id === spec.id) {
                boo = false;//当一个类别(比如口味 分量) 已经存在 那说明这个类别的规格议价选了 所以不push到数组里了

                //当点击的的是同一spec 同一个value
                if (vm.specData[i].valueId === specValue.id) {
                    vm.specData.splice(i, 1);//移除
                    specValue.checked = false;
                    console.log('同一个spec和value', vm.specData);
                }
                else {
                    // 同一个spec不同value,移除原有的spec value,添加新的value
                    vm.specData.splice(i, 1);//移除
                    vm.clearSpec(spec.id);
                    specValue.checked = true;//当前规格选中状态 红色
                    vm.specData.push(oneSpec);//添加当前的
                    console.log('同一个spec不同value', vm.specData);
                    break; //结束循环 要是不结束的话 会因为新push进去的对象 然后走 同一spec和同一个value这里的代码

                }
            }
        }

        if (boo) {
            specValue.checked = true;
            vm.specData.push(oneSpec);
            // console.log('++++++',vm.specData);
        }

    };
    //确认加入购物车
    vm.addCartComfirm = function () {
        //判断规格是否都已经选好
        if (vm.specData.length === vm.productCart.specLists.length) {
            console.log('所有规格都选好了');
        } else {
            alertService.error('请选择规格');
        }

    }
}]);