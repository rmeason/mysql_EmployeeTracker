var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "12345",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
    if (err) throw err;

    start();
    console.log("connected");
});

function start() {
    inquirer
      .prompt({
        name: "querySelector",
        type: "list",
        message: "Would you like to search by [ARTIST], those with [MULTIPLE] hits, within a specific [RANGE], or by [SONG]?",
        choices: ["ARTIST", "MULTIPLE", "RANGE", "SONG"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.querySelector === "ARTIST") {
          showArtist();
        }
        else if(answer.querySelector === "MULTIPLE") {
          showMultiple();
        } 
        else if(answer.querySelector === "RANGE") {
            showRange();
        }
        else if(answer.querySelector === "SONG") {
           showSong();
        }
        else{
          connection.end();
        }
      });
    }
