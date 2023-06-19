const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

// Route1: Get all the notes using GET "/api/notes/fetchallnotes"  | Login Required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json({success: true, notes: notes});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success: false, error: "1Internal Server Error" });
  }
});

// Route2: Post the note using GET "/api/notes/addnote"  | Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Invalid title").isLength({ min: 3 }),
    body("description", "Invalid Description").isLength({ min: 5 }),
    body("tag", "Invalid Tag").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({success: false, errors: result.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      //   res.send({title, description, tag});
      const saveNote = await note.save();
      res.json({success: true, notes: saveNote});
    } catch (error) {
      // console.log(error.message);
      res.status(500).json({success: false, error: "2Internal Server Error" });
    }
  }
);

// Route3: Get all the notes using GET "/api/note/updatenote"  | Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const {title, description, tag} = req.body;
    // Create a new Note with updated values
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send({success: false, error: "Note Not Found"})};

    if(note.user.toString() !== req.user.id){
        return res.status(401).send({success: false, error: "Access Denied"});
    }
    
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({success: true, note: note});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success: false, error: "3Internal Server Error" });
  }
});

// Route4: Get all the notes using GET "/api/note/deletenote"  | Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send({success: false, error: "Note Not Found"})};

    if(note.user.toString() !== req.user.id){
        return res.status(401).send({success: false, error: "Access Denied"});
    }
    
    res.send("Note Deleted");
    await Note.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success: false, error: "4Internal Server Error" });
  }
});

module.exports = router;

