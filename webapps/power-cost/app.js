var app = angular.module("app", []);
app.controller("controller", function ($scope) {

    $scope.consumption = 5;
    $scope.hours_per_day = 24;
    $scope.electricity_price = 0.62;    
    
});