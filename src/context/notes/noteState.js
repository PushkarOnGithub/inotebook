import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://127.0.0.1:5000";
  const [notes, setNotes] = useState([]);

  // Getting All Notes a User have

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
        localStorage.getItem('authToken'),
      },
    });
    let json = await response.json();
    setNotes(json.notes);
  }
  //Adding a Note

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('authToken'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    let json = await response.json();
    json = json.notes;
    setNotes(notes.concat(json));
    
  };

  //Deleting a Note

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
        localStorage.getItem('authToken'),
      },
    });
    // console.log("deleting" + id);
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
        localStorage.getItem('authToken'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    let json = await response.json();
    json = json.notes;
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

  // Empty the notes

  const emptyNotes = () => {
    setNotes([]);
  }
  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes, emptyNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
