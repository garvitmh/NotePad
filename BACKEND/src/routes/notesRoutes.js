import express from "express"
import { getAllNotes , createNote , deleteNote , updateNotes, getNotesById } from "../controllers/noteControllers.js";
const router = express.Router()

router.get("/" , getAllNotes) 

router.get("/:id" ,getNotesById) 


router.post("/" , createNote)

router.put("/:id", updateNotes)

router.delete("/:id", deleteNote)


export default router



