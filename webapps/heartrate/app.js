var app = angular.module("app", []);
app.controller("controller", function ($scope) {

    $scope.weight = "90";
    $scope.rhr = "70";
    $scope.age = "45";
    $scope.time = "60";
    $scope.gender = "male";

    $scope.zones = [
        { id: 5, from: 90, to: 100, type: "Red-Line / Maximum", desc: "90% carbohydrates, 10% fats, and less than 1% protein" },
        { id: 4, from: 80, to: 90, type: "Anaerobic / Threshold", desc: "85% fat, 5% protein, and 10% carbohydrate" },
        { id: 3, from: 70, to: 80, type: "Aerobic", desc: "50% from fat, 50% from carbohydrate, and less than 1% protein" },
        { id: 2, from: 60, to: 70, type: "Fitness", desc: "85% carbohydrates, 15% fat and less than 1% protein" },
        { id: 1, from: 50, to: 60, type: "Healthy", desc: "85% fat, 5% protein, and 10% carbohydrate" }
    ];

$scope.calculateHRZones = function () {

    person = new Person($scope.age, $scope.weight, $scope.rhr, $scope.gender);

    $scope.max_hr = person.max_hr;
    $scope.show_max_hr = true;

    console.log($scope.zones);

    let hrzones = [];
    hrzones.push(person.getHRZone());
    hrzones.push(person.getHRZone($scope.zones[0]));
    hrzones.push(person.getHRZone($scope.zones[1]));
    hrzones.push(person.getHRZone($scope.zones[2]));
    hrzones.push(person.getHRZone($scope.zones[3]));
    hrzones.push(person.getHRZone($scope.zones[4]));
    $scope.hrzones = hrzones;

};

});

function maxHR(age, weight, gender) {
    // 211.415 - (0.5 * age) - (0.05 * weight in lbs) + 4.5 (add 4.5 only for men)
    // http://nowlin.com/heartrate.htm
    impediment_factor = (0.5 * parseFloat(age)) - (0.05 * ((parseFloat(weight) * 2.2)));
    if (gender == "male") {
        impediment_factor += 4.5;
    }
    max_hr = 211.415 - impediment_factor;
    return max_hr;
}

class HRZone {
    constructor() {

        this.name = "";
        this.desc = "";
        this.type = "";
        this.range = { hr: "", perc: "", kcal: "", fat: "" };
    }
}


class Person {
    constructor(age, weight, rhr, gender) {
        this.age = age;
        this.weight = weight;
        this.rhr = rhr;
        this.gender = gender;
        this.max_hr = maxHR(age, weight, gender);
    }

    getHRZone(zone) {

        console.log(zone);

        let hrZone = new HRZone();
        if (zone == null) {
            hrZone.name = "Name";
            hrZone.desc = "Details";
            hrZone.type = "Type";
            hrZone.range.hr = "Range HR";
            hrZone.range.perc = "Range %";
            hrZone.range.kcal = "Range kcal";
            hrZone.range.fat = "Range kcal (fat)";
        }
        else {

            hrZone.name = `Zone ${zone.id}`;
            hrZone.desc = zone.desc;
            hrZone.type = zone.type;
            hrZone.range.hr = "Range HR";
            hrZone.range.perc = `[${zone.from}% - ${zone.to}%]`;
            hrZone.range.kcal = "Raneg Perc";
            hrZone.range.fat = "Raneg Perc";
        }
        return hrZone;
    }

}
