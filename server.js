// import required modules and packages
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

// setup express.js server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// define routes
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API ROUTES
app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;
        const parsedFile = JSON.parse(file);
        return res.send(parsedFile);
    });
});

app.post("/api/notes", (req, res) => {
    let note = req.body;
    note["id"] = uuidv4(); // using uuidv4 for unique id
    note["title"] = req.body.title;
    note["text"] = req.body.text;

    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        const parsedFile = JSON.parse(file);
        parsedFile.push(note);

        const newStringifiedFile = JSON.stringify(parsedFile);
    
        fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
            if (err) throw err;
            console.log("The new note was appended to the file!");
        });

        return res.send(JSON.parse(newStringifiedFile));
    });    
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (error, file) => {
        if (error) throw error;

        let deletedNoteId = req.params.id;
        const parsedFile = JSON.parse(file);
        const newParsedFile = parsedFile.filter(elem => elem.id != deletedNoteId);

        const newStringifiedFile = JSON.stringify(newParsedFile);

        fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
            if (err) throw err;
            console.log("The note was deleted!");
        });

        return res.send(JSON.parse(newStringifiedFile));
    });
});

// If no matching route is found default to index
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
