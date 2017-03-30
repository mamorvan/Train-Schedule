  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBzDsD_6WrG5le_1oDqBQwUK65Bxj6nt-M",
    authDomain: "train-schedule-124a7.firebaseapp.com",
    databaseURL: "https://train-schedule-124a7.firebaseio.com",
    storageBucket: "train-schedule-124a7.appspot.com",
    messagingSenderId: "57456079816"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function(event){
 	event.preventDefault();

  	var trainName = $("#inputTrainName").val().trim();
  	var destination = $("#inputDestination").val().trim();
  	var firstTime = $("#inputFirstTime").val().trim();
  	var frequency = $("#inputFrequency").val().trim();

 console.log(trainName + " - " + destination + " - " + firstTime + " - " + frequency);
  	
  	database.ref().push({
  		trainName: trainName,
  		destination: destination,
  		firstTime: firstTime,
  		frequency: frequency

  	});

  	alert("Train added to database");

  	$("#inputTrainName").val("");
  	$("#inputDestination").val("");
  	$("#inputFirstTime").val("");
  	$("#inputFrequency").val("");



  }) //end of addTrain button click

  $("#clearTrains").on("click", function(event){
  	event.preventDefault();

  	database.ref().remove();

  }) //end of clearTrains button click
