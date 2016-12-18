angular.module('starter.controllers', [])

  .controller('LoanCtrl', function ($scope) {

    $scope.data = { p: null };
    $scope.data.tableData = [];
    $scope.Math = window.Math;

    $scope.calculateBreakup = function () {
      var emi = ((Math.pow((1 + ($scope.data.R / 1200)), $scope.data.nMonth + ($scope.data.nYear * 12))) * $scope.data.p * ($scope.data.R / 1200)) / (Math.pow(1 + ($scope.data.R / 1200), $scope.data.nMonth + ($scope.data.nYear * 12)) - 1);
      console.log(emi);
      var tableData = [];
      var principalCompArr = [];
      var yearlyP = 0;
      var yearlyI = 0;
      var interestCompArr = [];
      var outStandingPArr = [];
      var remainingPrincipal = $scope.data.p;
      for (i = 1; i <= $scope.data.nMonth + ($scope.data.nYear * 12); i++) {
        var monthlyInterest = remainingPrincipal * $scope.data.R / 1200;
        var monthlyPrincipal = emi - monthlyInterest;        
        var remainingPrincipal = remainingPrincipal - monthlyPrincipal;
        var month = (i % 12);
        var year = ((12 - month + i) / 12) - 1;
        var emiObj = { cnt: i, emiYear: year, emiMonth: month, emi: emi, interest: monthlyInterest, principal: monthlyPrincipal, remainingPrincipal: remainingPrincipal };
        tableData.push(emiObj);
        if(month==0){
          yearlyP+=monthlyPrincipal;
          yearlyI+=monthlyInterest;
          principalCompArr.push(yearlyP);
          interestCompArr.push(yearlyI);
          outStandingPArr.push(remainingPrincipal);          
          yearlyP = 0;
          yearlyI = 0;
        }
      }
      $scope.data.tableData = tableData;
      $scope.yearlyJson = {
        type: "line",
        title: {
          textAlign: 'center',
          text: "Yearly Breakup"
        },
        series: [{
          values : interestCompArr,
          backgroundColor : "#4DC0CF"
        },{
          values : principalCompArr,
          backgroundColor : "#4DC0CF"
        }]
      };
      $scope.principalJson = {
        type: "line",
        title: {
          textAlign: 'center',
          text: "Yearly OutStanding Principal"
        },
        series: [{
          values : outStandingPArr,
          backgroundColor : "#4DC0CF"
        }]
      };
      console.log($scope.data.tableData);
    }
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
