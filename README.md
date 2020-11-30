# HW-11-Express-Note-Taker

## Description

This application can be used to write, save, and delete notes. This application uses an express backend and saves and retrieves note data from a JSON file.


* The following HTML routes were created:

  * GET `/notes` - returns the `notes.html` file.

  * GET `*` - returns the `index.html` file

* The application has a `db.json` file on the backend that is used to store and retrieve notes using the `fs` module.

* The following API routes were created:

  * GET `/api/notes` - reads the `db.json` file and returns all saved notes as JSON.

  * POST `/api/notes` - receives a new note to save on the request body, adds it to the `db.json` file, and then returns the new note to the client.

  * DELETE `/api/notes/:id` - receives a query parameter containing the id of a note to delete. 
## User Story

AS A user, I want to be able to write and save notes

I WANT to be able to delete notes I've written before

SO THAT I can organize my thoughts and keep track of tasks I need to complete

## Business Context

For users that need to keep track of a lot of information, it's easy to forget or be unable to recall something important. Being able to take persistent notes allows users to have written information available when needed.
