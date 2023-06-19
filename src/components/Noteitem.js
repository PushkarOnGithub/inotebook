import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import alertContext from "../context/alert/alertContext";


const Noteitem = (props) => {
  const alertcontext = useContext(alertContext);
  const {showAlert} = alertcontext;
  const notecontext = useContext(noteContext);
  const {deleteNote} = notecontext;
  const {note, handleUpdateNote } = props;
  return (
    <div className="col-md-3">
    <div className="card my-3" >
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); showAlert("Deleted SuccessFully", "success");}}></i>
    <i className="fa-solid fa-pen-to-square mx-2 " onClick={()=>handleUpdateNote(note)}></i>
  </div>
</div>
</div>
  )
}

export default Noteitem
