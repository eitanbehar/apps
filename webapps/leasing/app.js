var app = angular.module("app", []);
app.controller("controller", function ($scope) {
  
    $scope.fuel_price = 6.5;
    $scope.km_per_year = 20000;
    $scope.private = { price: 140000, km_per_liter: 15, insurance: 4500, rishui: 1500, tipul: 1000, devaluated: 35 };
    $scope.leasing_private = { initial: 8900, monthly: 2500, benefits_lost: 0 } ;
    $scope.leasing_company = { initial: 0, monthly: 3200, benefits_lost: 700 } ;

});