var app = angular.module('app', ['zingchart-angularjs']);

app.controller('controller', function($scope) {
  $scope.myJson = {
    type: "bar",
    title: {
      textAlign: 'center',
      text: "Garmin Width"
    }, 
    "scaleX":{
        "values": ["255","955","735XT","245","745","Fenix7","45","945","Fenix6"],
        "placement":"default",        
    },   
    series: [{
      values: [12.9, 14.4, 11.9, 12.2, 13.3, 14.5, 11.4, 13.7, 13.8],
      text: "Width"
    }],
    series: [{
        values: [12.9, 14.4, 11.9, 12.2, 13.3, 14.5, 11.4, 13.7, 13.8],
        text: "Width"
      }],
      series: [{
        values: [12.9, 14.4, 11.9, 12.2, 13.3, 14.5, 11.4, 13.7, 13.8],
        text: "Width"
      }],
      series: [{
        values: [12.9, 14.4, 11.9, 12.2, 13.3, 14.5, 11.4, 13.7, 13.8],
        text: "Width"
      }]
  };
});
