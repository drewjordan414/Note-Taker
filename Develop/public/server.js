// import required modules and packages
const express = require("express");
const path = require("path");
const fs = require("fs");

// setup express.js server
const app = express();
// define routes
app.use(express.urlencoded({ extended: true }));
    // get route for home page
    app.get("/public", function(req, res) {
        // return index.html
        res.sendFile(path.join(__dirname, "index.html"));
        if (err) {
            console.log(err);
        }else {
            console.log("Success!");
        }
    });
    // get route for notes page
    app.get("/notes", function(req, res) {
        //reurn the nores.html file
        rese.sendFile(path.join(__dirname,"notes.html"))
        if (err) {
            console.log(err);
        }else {
            console.log("Success!");
        }
    });
    // get route to retrieve all saved notes
        // read db.json file
        // return all saved notes as json

    // post route to add new saved notes
        // read db.json file
        // parse the request body to get the new note data
        // assign a unique id
        // push this new note to the array of saved notes
        // write the updated array of notes the db.json file
        // return the new note to the client

    // delete route to remove a saved note based on id
        // read db.json file
        // get the id of the note to be able to remove
        // find the note with the corresponding id in the array
        // remove the note from the array
        // write the updated array of notes with the deleted missing

// use the helper folder for your uuid and utils
