import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://127.0.0.1:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4M2ZhYWI2MWEyYTBkNWE1NzM4YmY0In0sImlhdCI6MTY4NjM3NzY3Nn0.tn03LYeIIzwbHPbZferKshregzFqb-8o5TPuAnW0DIY",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Adding a Note

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4M2ZhYWI2MWEyYTBkNWE1NzM4YmY0In0sImlhdCI6MTY4NjM3NzY3Nn0.tn03LYeIIzwbHPbZferKshregzFqb-8o5TPuAnW0DIY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
    
  };

  //Deleting a Note

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4M2ZhYWI2MWEyYTBkNWE1NzM4YmY0In0sImlhdCI6MTY4NjM3NzY3Nn0.tn03LYeIIzwbHPbZferKshregzFqb-8o5TPuAnW0DIY",
      },
    });
    console.log("deleting" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Editing a Note
  
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4M2ZhYWI2MWEyYTBkNWE1NzM4YmY0In0sImlhdCI6MTY4NjM3NzY3Nn0.tn03LYeIIzwbHPbZferKshregzFqb-8o5TPuAnW0DIY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = [];
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes.push(
          {
            title: title,
            description: description,
            tag: tag,
            _id: id,
            __v: element.__v,
            date: element.date,
            user: element.user
          }
        )
      }
      else{
        newNotes.push(element);
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
