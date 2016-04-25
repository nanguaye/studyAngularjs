/**
 * Created by nangua on 16/4/25.
 */


/*为了方便,所有的指令都写在这个directiveye js文件里面.*/
myApp.directive('item',function () {
   return{
       restrict:'E',
       scope:{
           shopList:'='   //隔绝作用域
       },
       templateUrl:"./yeapp/directive/itemTemplate.html"
   } 
});