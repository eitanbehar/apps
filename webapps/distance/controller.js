app.controller("controller", function ($scope, $http) {


    $scope.from = "32.0709839,34.7851076"; // sarona market
    $scope.to = "32.0740769,34.7900141"; // azrieli
    $scope.fromAddress = "Sarona Market Tel Aviv";
    $scope.toAddress = "Azrieli Tel Aviv";

    $scope.calculateDistance = function () {

        let destinations = [];
        let selected_destinations = [];

        console.log($scope.from);

        selected_destinations.push(GetDistanceResult($scope.from, $scope.to, "To selected destination"));
        destinations.push(GetDistanceResult($scope.from, "32.054062,34.7826012", "Tel Aviv HaHagana Railway Station"));
        destinations.push(GetDistanceResult($scope.from, "32.0784123,34.7905662", "Tel Aviv HaShalom Railway Station"));
        destinations.push(GetDistanceResult($scope.from, "32.083944,34.7954446", "Tel Aviv Savidor Railway Station"));
        destinations.push(GetDistanceResult($scope.from, "32.1033559,34.802656", "Tel Aviv University Train Station"));

        $scope.destinations = destinations;
        $scope.selected_destinations = selected_destinations;
    }

    $scope.getCoordinates = function (target, address) {
        console.log(target, address);
        res = getCoordinates($http, address);
        if (target == 0) {
            $scope.fromAddressList = res;
        } else {
            $scope.toAddressList = res;
        }
    }

    $scope.clearAddress = function (target) {
        if (target == 0) {
            $scope.fromAddress = "";
            $scope.fromAddressList =  null;
        }
        else {
            $scope.toAddress = "";
            $scope.toAddressList =  null;
        }
    }

    $scope.clearLat = function (target) {
        if (target == 0) {
            $scope.fromAddress = "";
            $scope.fromAddressList =  null;
            $scope.from = null;
        }
        else {
            $scope.toAddress = "";
            $scope.toAddressList =  null;
            $scope.to = null;
        }
    }

    $scope.selectAddress = function (target, address) {

        if (target == 0) {
            $scope.from = address.coordinates;
            $scope.fromAddress = address.name;
            $scope.fromAddressList = null;
        } else {
            $scope.to = address.coordinates;
            $scope.toAddress = address.name;
            $scope.toAddressList = null;
        }
        $scope.destinations = null;
    }

});

function getCoordinates(http, address) {
    let addresses = [];
    queryUrl = `https://eu1.locationiq.com/v1/search.php?key=7a5d887e3e47df&q=${address}&format=json`;
    http.get(queryUrl).then(function (response) {
        console.log(response.data);
        for (i = 0; i < response.data.length; i++) {
            address = { name: response.data[i].display_name, coordinates: `${response.data[i].lat},${response.data[i].lon}` };
            addresses.push(address);
        }
    });
    return addresses;
}

function GetDistanceResult(from, to, text) {
    a = new Point(from);
    b = new Point(to);
    d = Distance(a.lat, a.lon, b.lat, b.lon);

    toUrled = "";
    if (text == "To selected destination")
        toUrled = b.coordinates;
    else
        toUrled = text.replace(' ', '+');

    return { name: text, distance: d, map: `https://www.google.com/maps/dir/?api=1&origin=${a.coordinates}&destination=${toUrled}&travelmode=walking` };
}

class Point {
    constructor(coordinates) {

        var address = coordinates.split('@');
        var coordinates = address[address.length - 1];
        var c = coordinates.split(',');
        this.lat = parseFloat(c[0]);
        this.lon = parseFloat(c[1]);
        this.coordinates = `${this.lat},${this.lon}`;
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