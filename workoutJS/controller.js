app.controller("controller", function($scope, $http) {
    
    $scope.moods = [ "Normal", "Lazy", "Energetic"];
    $scope.selectedMode = "Normal";
    $scope.workoutOptions = { extra: true, bodyweight: true, barbell: true, kettlebell: true, aerobic: true}

    $scope.generateWorkout = function(){        
        $http.get('workouts.json').then(function(response) {
            
            let drills = [];
            
            drills.push(SelectDrill(response.data.modes, $scope.selectedMode, null));

            if($scope.workoutOptions.extra == true)
                drills.push(SelectDrill(response.data.workouts.extra, $scope.selectedMode, $scope.workoutOptions));

            drills.push(SelectDrill(response.data.workouts.upper, $scope.selectedMode, $scope.workoutOptions));
            drills.push(SelectDrill(response.data.workouts.core,$scope.selectedMode, $scope.workoutOptions));
            drills.push(SelectDrill(response.data.workouts.lower, $scope.selectedMode, $scope.workoutOptions));
            $scope.drills = drills;
         });
    }
  });

  function SelectDrill(drillArray, mood, options)
  {
    let filtered = [];
    if(options == null) 
    {     
        filtered = drillArray;
    }    
    else
    {
        if(options.barbell == true)        
            filtered = filtered.concat(drillArray.filter(function(x) { return x.type == "barbell"; }));        
        if(options.bodyweight == true)
            filtered = filtered.concat(drillArray.filter(function(x) { return x.type == "bodyweight"; }));        
        if(options.aerobic == true)
            filtered = filtered.concat(drillArray.filter(function(x) { return x.type == "aerobic"; }));        
        if(options.kettlebell == true)
            filtered = filtered.concat(drillArray.filter(function(x) { return x.type == "kettlebell"; }));        
    }

    let drill = filtered[Math.floor(Math.random() * filtered.length)];
    if(mood == "Lazy")
        drill.limit = Math.round(parseInt(drill.limit) * 0.8);        
    if(mood == "Energetic")
        drill.limit = Math.round(parseInt(drill.limit) * 1.2);    

    return drill;
  }