angular.module('starter.controllers', ['ionic.contrib.ui.cards'])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('cardController', function($scope, $http){
  //$scope.data = {};
  $scope.cards = [];
  $scope.current = 0;
  //$scope.card = {};
  /*$scope.thisCard = function(){
    return $scope.cards.shift();
  };
  $scope.showCard = $scope.thisCard;
  */
  $scope.myItems = [];
  $scope.done = function(){
    if($scope.current > 9){
      return true;
    }else{return false;}
  };
  $scope.showCard = function(index){
    if(index == $scope.current){
      return true;
    }else{
      return false;
    }
  };
  $scope.incrimentY = function(){
    $scope.myItems.push($scope.cards[$scope.current]);
    $scope.current ++;
  };
  $scope.incrimentN = function(){
    $scope.current ++;
  };
  $scope.generateCards = function(){
    
    var ajax = $http({
      url: 'http://origin-api.macys.com/v3/catalog/category/5449/browseproducts?resultsperpage=10&sortby=price&sortorder=asc&imagewidth=300',
      method: 'GET',
      headers: {
        Accept : 'application/json',
  		  'X-Macys-Webservice-Client-Id' : 'neohack14'
      }
    });
    ajax.success(function(data){
      var allProducts = data.category[0].product.product;
      for(var i = 0; i < allProducts.length; i++){
        var card = {
          imageUrl: allProducts[i].image[0].imageurl,
          price: allProducts[i].price.current.value,
          name: allProducts[i].summary.name,
          exclusive: allProducts[i].badges.OnlyatMacys
        };
        $scope.cards.push(card);
      }
       console.log($scope.cards);
    })
    ajax.error(function(){
      
      for(var i = 0; i < 10; i++){
        var card = {
          imageUrl: "http://t3.gstatic.com/images?q=tbn:ANd9GcTDA7Af0ucivP5HsSg_VV0N_30zeYVVgKgpBiAu5I8Z-HaQLbmPVA",
          price: 39.99,
          name: "where's waldo" + i,
          exclusive: false
        };
        $scope.cards.push(card);
      }
       console.log($scope.cards);
    });
  };
  angular.element(document).ready($scope.generateCards());
});

