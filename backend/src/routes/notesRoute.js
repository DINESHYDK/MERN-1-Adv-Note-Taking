import express from "express";
import{createNote, getAllNotes, updateNote, deleteNote, getNoteById} from "../controllers/notesController.js";

const router = express.Router();

// The second parameter was called as 'controllers' and for a neat structure we are simply wrote the code into another folder and using it here
// so, start reading the code line by line and then read everything and try to debug it, and learn from it..
router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;