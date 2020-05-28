app.controller("controller", function($scope, $http) {
    
    $scope.moods = [ "Normal", "Lazy", "Energetic"];
    $scope.selectedMode = "Normal";
    $scope.extraOptions = [ "Yes, plis!", "No way Jose!!!"];
    $scope.selectedExtra = "Yes, plis!";

    $scope.generateWorkout = function(){        
        $http.get('workouts.json').then(function(response) {
            
            //console.log(response.data.workouts.upper[0]);
            
            let drills = [];

            drills.push(SelectDrill(response.data.modes, $scope.selectedMode));

            if($scope.selectedExtra.includes("Yes"))
                drills.push(SelectDrill(response.data.workouts.extra, $scope.selectedMode));

            drills.push(SelectDrill(response.data.workouts.upper, $scope.selectedMode));
            drills.push(SelectDrill(response.data.workouts.core,$scope.selectedMode));
            drills.push(SelectDrill(response.data.workouts.lower, $scope.selectedMode));
            $scope.drills = drills;
            
         });
    }
  });

  function SelectDrill(drillArray, mood)
  {
    let drill = drillArray[Math.floor(Math.random() * drillArray.length)];
    if(mood == "Lazy")
        drill.limit = Math.round(parseInt(drill.limit) * 0.8);
    if(mood == "Energetic")
        drill.limit = Math.round(parseInt(drill.limit) * 1.2);
    return drill;
  }