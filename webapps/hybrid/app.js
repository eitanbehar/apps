var app = angular.module("app", []);
app.controller("controller", function ($scope) {

    $scope.hybrid = { price: 145000, consumption: 20 };
    $scope.turbo = { price: 135000, consumption: 15 };
    $scope.fuel_price = 6.5;
    $scope.km_per_year = 20000;
    $scope.devaluation = 40;
    $scope.interval_in_years = 3;

    $scope.calculate = function () {


    };

});