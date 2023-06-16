// import required modules and packages
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
let notes = [];
// setup express.js server

// define routes
    
    // get route for home page
       // return index.html

    // get route for notes page
         // return notes.html

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



