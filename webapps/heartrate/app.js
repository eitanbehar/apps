var app = angular.module("app", []);
app.controller("controller", function ($scope) {

    $scope.weight = "90";
    $scope.rhr = "70";
    $scope.age = "45";
    $scope.time = "60";
    $scope.gender = "male";

    $scope.zones = [
        { id: 5, from: 90, to: 100, type: "Maximum / Red-Alert", fat_perc: 10, desc: "90% carbs, 10% fats, and less than 1% protein" },
        { id: 4, from: 80, to: 90, type: "Anaerobic", fat_perc: 15, desc: "85% carbohydrates, 15% fat and less than 1% protein" },
        { id: 3, from: 70, to: 80, type: "Aerobic", fat_perc: 50, desc: "50% from fat, 50% from carbs, and less than 1% protein" },
        { id: 2, from: 60, to: 70, type: "Fitness", fat_perc: 85, desc: "85% fat, 5% protein, and 10% carbs" },
        { id: 1, from: 50, to: 60, type: "Healthy", fat_perc: 85, desc: "85% fat, 5% protein, and 10% carbs" }
    ];

$scope.calculateHRZones = function () {

    person = new Person($scope.age, $scope.weight, $scope.rhr, $scope.gender);

    $scope.max_hr = person.max_hr;
    $scope.show_max_hr = true;

    console.log($scope.time);

    let hrzones = [];
    hrzones.push(person.getHRZone(null, $scope.time));
    hrzones.push(person.getHRZone($scope.zones[4], $scope.time));
    hrzones.push(person.getHRZone($scope.zones[3], $scope.time));
    hrzones.push(person.getHRZone($scope.zones[2], $scope.time));
    hrzones.push(person.getHRZone($scope.zones[1], $scope.time));
    hrzones.push(person.getHRZone($scope.zones[0], $scope.time));
    $scope.hrzones = hrzones;

};

});

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
        this.age = parseInt(age);
        this.weight = parseFloat(weight);
        this.rhr = parseInt(rhr);
        this.gender = gender;
        this.max_hr = this.maxHR();
    }

    maxHR() {
        // 211.415 - (0.5 * age) - (0.05 * weight in lbs) + 4.5 (add 4.5 only for men)
        // http://nowlin.com/heartrate.htm
        var impediment_factor = (0.5 * parseFloat(this.age)) - (0.05 * ((parseFloat(this.weight) * 2.2)));
        if (this.gender == "male") {
            impediment_factor += 4.5;
        }
        var max_hr = 211.415 - impediment_factor;
        return Math.floor(max_hr);
    }

    getHRZone(zone, time) {

        console.log(time);
        let hrZone = new HRZone();
        if (zone == null) {
            hrZone.name = "Name";
            hrZone.desc = "Calories burning ratio";
            hrZone.type = "Type";
            hrZone.range.hr = "Range HR";
            hrZone.range.perc = "Range %";
            hrZone.range.kcal = `Total kcal burned in ${time} minutes`;
            hrZone.range.fat = `Fat kcal burned in ${time} minutes`;
        }
        else {
            
            var from_hr = Math.ceil(((zone.from/100) * (this.max_hr - this.rhr)) + this.rhr);
            var to_hr = Math.floor((zone.to/100) * (this.max_hr - this.rhr) + this.rhr);

            hrZone.name = `Zone ${zone.id}`;
            hrZone.desc = zone.desc;
            hrZone.type = zone.type;
            hrZone.range.hr = `${from_hr} - ${to_hr}`;
            hrZone.range.perc = `${zone.from}% - ${zone.to}%`;
            
            var from_kcal = this.getKCal(from_hr, time);
            var to_kcal = this.getKCal(to_hr, time);
            hrZone.range.kcal = `${from_kcal} - ${to_kcal}`;
            
            var from_fat_kcal = Math.ceil(from_kcal * zone.fat_perc / 100);
            var to_fat_kcal = Math.floor(to_kcal * zone.fat_perc / 100);
            hrZone.range.fat = `${from_fat_kcal} - ${to_fat_kcal}`;

        }
        return hrZone;
    }

    getKCal(hr, time) {   
        return Math.ceil((((this.age*0.2017)-(this.weight*2.2*0.09036)+(hr*0.6309))*parseInt(time))/4.184);
    }

}
