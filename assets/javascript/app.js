// Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyBO0c6VZsXcMt1-Fq2nuYow8CjkoXGkKLs",
    authDomain: "test-project-1f4e7.firebaseapp.com",
    databaseURL: "https://test-project-1f4e7.firebaseio.com",
    projectId: "test-project-1f4e7",
    storageBucket: "test-project-1f4e7.appspot.com",
    messagingSenderId: "131253295045",
    appId: "1:131253295045:web:6d22fb43b480e7c3f41dac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// VARIABLES
// --------------------------------------------------------------------------------

    var database = firebase.database();


    $("#submit-info").on("click", function() {
        event.preventDefault();

        


        let company_name = $("#name-input").val().trim();
        let destination_location = $("#destination").val().trim();
        let jet_time = $("#jet-time").val().trim();
        let frequency = $("#min-rate").val().trim();

        database.ref().push({

            name: company_name,
            destination: destination_location,
            time: jet_time,
            rate: frequency
            
        });

        $("#name-input").val("");
        $("#destination").val("");
        $("#jet-time").val("");
        $("#min-rate").val("");


    });

     database.ref().on("child_added", function(snapshot) {

        let sv = snapshot.val();


        let convertedT = moment(sv.time, "HH:mm").subtract(1, "years");

        let currentT = moment();

        let diffT = moment().diff(moment(convertedT), "minutes");

        let remainderT = diffT % sv.rate;

        let minsAway = sv.rate - remainderT;

        let nextJet = moment().add(minsAway, "minutes");

        let newJet = moment(nextJet).format("hh:mm A");

        let newRow = $("<tr>");
        let jet = $("<td>").text(sv.name);
        let jetDestination = $("<td>").text(sv.destination);
        let freq = $("<td>"). text(sv.rate);
        let minutesAway = $("<td>").text(minsAway);
        let nxtJet = $("<td>").text(newJet)

        newRow.append(jet);
        newRow.append(jetDestination);
        newRow.append(freq);
        newRow.append(nxtJet);
        newRow.append(minutesAway);

        newRow.appendTo(".user-input")

     }, function (errorObjects) {
         console.log("Errors handled: " + errorObjects.code);
     });
         
     


     
