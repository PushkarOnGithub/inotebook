import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import EditingForm from "./EditingForm";
import alertContext from "../context/alert/alertContext";


const Notes = () => {
  const alertcontext = useContext(alertContext);
  const {showAlert} = alertcontext;
  const notecontext = useContext(noteContext);
  const { notes, getNotes, editNote } = notecontext;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("authToken")){
    getNotes();/* eslint-disable-line*/}
    else{
      showAlert("Login or Create Account to Continue", "danger")
      navigate("/login")
    }
  }, []);

  const [note, setNote] = useState({title: "", description: "", tag: ""});
  const onChange=(event)=>{
    setNote({...note, [event.target.name]: event.target.value})
    // console.log(note);
  }

  const refEdit = useRef(null);
  const refClose = useRef(null);
  const handleUpdateNote = (note) => {
    refEdit.current.click();
    setNote(note);
  };

  const handleSaveChanges= ()=>{
    editNote(note._id, note.title, note.description, note.tag);
    refClose.current.click();
    showAlert("Note Edited Successfully", "success");
  }
    
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={refEdit}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit the Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"><EditingForm onChange={onChange} note={note}/></div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3">
          <h2>Your Notes</h2>
          <div className="container">
          {
            notes.length === 0 && "No Notes to Display!!!"
          }
           
          </div>

          {notes.map((note) => {
            return (
              <Noteitem key={note._id} handleUpdateNote={handleUpdateNote} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
