app.controller("controller", function ($scope) {


    $scope.from = "32.0709839,34.7851076"; // sarona market
    $scope.to = "32.0831482,34.7651349"; // gordon beach

    $scope.calculateDistance = function () {

        let destinations = [];

        destinations.push(GetDistanceResult($scope.from, $scope.to, "To selected destination"));
        destinations.push(GetDistanceResult($scope.from, "32.054062,34.7826012", "To Tel Aviv HaHagana Train Station"));
        destinations.push(GetDistanceResult($scope.from, "32.0784123,34.7905662", "To Tel Aviv HaShalom Train Station"));
        destinations.push(GetDistanceResult($scope.from, "32.083944,34.7954446", "To Tel Aviv Savidor Train Station"));
        destinations.push(GetDistanceResult($scope.from, "32.1033559,34.802656", "To Tel Aviv University Train Station"));

         $scope.destinations = destinations;
    }
});

function GetDistanceResult(from, to, text) {
    a = new Point(from);
    b = new Point(to);
    d = Distance(a.lat, a.lon, b.lat, b.lon) ;
    return {name: text, distance: d + " meters" };
}

class Point {
    constructor(coordinates) {

        var address = coordinates.split('@');
        var coordinates = address[address.length -1];
        var c = coordinates.split(',');
        this.lat = parseFloat(c[0]);
        this.lon = parseFloat(c[1]);                
    }
}

// https://www.mapanet.eu/EN/resources/Script-Distance.htm
function Distance(lat1, lon1, lat2, lon2) {
   
    rad = function (x) { return x * Math.PI / 180; }

    var R = 6378.137;                  //Earth radius in km (WGS84)
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toFixed(3) * 1000; //Return 3 decimals, * to get meters

}

function DegreeToRadian(angle) {
    return Math.PI * angle / 180.0;
}

function FitUnitsToDecimalDegrees(units) {
    return units * (180 / (Math.Pow(2, 31)));
}