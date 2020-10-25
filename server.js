// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// Star Wars Characters (DATA)
// =============================================================
// var characters = [
//   {
//     routeName: "yoda",
//     name: "Yoda",
//     role: "Jedi Master",
//     age: 900,
//     forcePoints: 2000
//   },
//   {
//     routeName: "darthmaul",
//     name: "Darth Maul",
//     role: "Sith Lord",
//     age: 200,
//     forcePoints: 1200
//   },
//   {
//     routeName: "obiwankenobi",
//     name: "Obi Wan Kenobi",
//     role: "Jedi Master",
//     age: 55,
//     forcePoints: 1350
//   }
// ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

var notes = []

// Displays all characters
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// should file and return all json notes 
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) =>{
    return res.json(JSON.parse(data));
  })
})


app.post("/api/notes", (req, res) => {
  // Should receive a new note to save on the request body, 
  //add it to the `db.json` file, and then return the new note to the client.
  // var newcharacter = req.body;
  // console.log(req.body)
  // console.log(newcharacter);
  
  var newNote = req.body;
  var newNoteId = uuidv4(); 
  Object.assign(newNote, {id: newNoteId});
  notes.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
    if (err) throw err;
    return res.json(req.body);
  })

  // characters.push(newcharacter);

  // We then display the JSON to the users
  
});

app.delete("/api/notes/:id", (req, res) => {
  var id = req.params.id;
  fs.readFile("./db/db.json", (err, data) =>{
    if (err) throw err;
    let noteHistory = JSON.parse(data);
    for (i=0; i<noteHistory.length; i++){
      if(noteHistory[i].id == id){
        notes.splice(i, 1);
        fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
          if (err) throw err;
          return res.json(req.body);
        })      
      }
    }
  })
});

app.get("*", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
