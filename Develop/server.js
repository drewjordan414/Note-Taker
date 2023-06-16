// import required modules and packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

// setup express.js server
const app = express();
app.use(express.static("/Develop/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let notes = [];

// define routes
// get route for home page
app.get("/public", function(req, res) {
    // return index.html
    res.sendFile(path.join(__dirname, "index.html"), err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success!");
        }
    });
});

// get route for notes page
app.get("/notes", function(req, res) {
    //return the notes.html file
    res.sendFile(path.join(__dirname,"notes.html"), err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success!");
        }
    });
});

// get route to retrieve all saved notes
app.get("/api/notes", function(req, res) {
    // read db.json file and return all saved notes as json
    fs.readFile("db.json", "utf8", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Success!");
            res.json(JSON.parse(data));
        }
    });
});

// post route to add new saved notes
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = uuidv4(); // assign a unique id

    // push this new note to the array of saved notes
    notes.push(newNote);

    // write the updated array of notes the db.json file
    fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success!");
            res.json(newNote); // return the new note to the client
        }
    });
});

// delete route to remove a saved note based on id
app.delete("/api/notes/:id", function(req, res) {
    // read db.json file
    const noteId = req.params.id;

    notes = notes.filter((note) => note.id !== noteId); // remove the note from the array

    // write the updated array of notes with the deleted missing
    fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success!");
            res.json({ ok: true }); // return success status
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
