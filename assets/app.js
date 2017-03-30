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

setInterval(function(){
	var currentTime = moment().format("h:mm");
$("#currentTime").html(currentTime);
}, 1000);


//ADD TRAIN BUTTON

$("#addTrain").on("click", function(event){
	event.preventDefault();

	var trainName = $("#inputTrainName").val().trim();
	var destination = $("#inputDestination").val().trim();
	var firstTime = $("#inputFirstTime").val().trim();
	var frequency = $("#inputFrequency").val().trim();
	
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

	//return false ? - from timesheet answer but not sure why

}); //end of addTrain button click

//FIREBASE EVENT TO ADD NEW TRAINS TO HTML WHEN ADDED TO DATABASE

database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var newTrainName = childSnapshot.val().trainName;
	var newDestination = childSnapshot.val().destination;
	var newFirstTime = childSnapshot.val().firstTime;
	var newFrequency = childSnapshot.val().frequency;

	var firstTimeConverted = moment(newFirstTime, "hh:mm").subtract(1,"days");
	
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	
	var timeRemainder = diffTime % newFrequency;

	var minutesTillNext = newFrequency - timeRemainder;

	var nextArrival = moment().add(minutesTillNext, "minutes");
	var nextArrivalConverted = moment(nextArrival).format("hh:mm");

	$("#trainScheduleTable").append("<tr><td>" + newTrainName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" +  nextArrivalConverted + "</td><td>" + minutesTillNext + "</td></tr>");

}); //end of firebase child added event


//CLEAR ALL TRAINS BUTTON

$("#clearTrains").on("click", function(event){
	event.preventDefault();

	confirm("Are you sure you want to clear all the trains?  This will erase all saved data!");

	database.ref().remove();
	$("#trainScheduleTable").empty();

}); //end of clearTrains button click
