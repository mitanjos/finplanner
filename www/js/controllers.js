angular.module('starter.controllers', [])

.controller('LoanCtrl', function($scope) {
  $scope.data={p:null};
  $scope.data.tableData=[];
  $scope.Math=window.Math;
  $scope.calculateBreakup=function(){    
    var emi = ((Math.pow((1+($scope.data.R/1200)),$scope.data.nMonth+($scope.data.nYear*12)))*$scope.data.p*($scope.data.R/1200))/(Math.pow(1+($scope.data.R/1200),$scope.data.nMonth+($scope.data.nYear*12))-1);
    console.log(emi);
    var tableData = [];
    var remainingPrincipal = $scope.data.p;
    for(i=1;i<=$scope.data.nMonth+($scope.data.nYear*12);i++){
      var monthlyInterest = remainingPrincipal*$scope.data.R/1200;
      var monthlyPrincipal = emi-monthlyInterest;
      var remainingPrincipal = remainingPrincipal-monthlyPrincipal;
      var month = (i%12);
      var year = ((12-month+i)/12)-1;
      var emiObj = {cnt:i,emiYear:year,emiMonth:month,emi:emi,interest:monthlyInterest,principal:monthlyPrincipal,remainingPrincipal:remainingPrincipal};
      tableData.push(emiObj);
    }
    $scope.data.tableData = tableData;
    console.log($scope.data.tableData);
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
