import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const Notes = await Note.find();
    res.status(200).send(Notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getNotesById(req, res) {
  try {
    const id =req.params.id;
    const NoteById = await Note.findById(id); 
    res.status(200).send(NoteById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const NewNote = new Note({ title, content });

   const savedNote =  await NewNote.save();

    res.status(201).json({ savedNote });
  } catch (error) {
    console.log("Error happned , cant create the node , please try again");
    res.status(500).json({ message: error.mesage });
  }
}

export async function updateNotes(req, res) {
    try {
        const id = req.params.id;
        const {title , content} = req.body;

        const UpdatedNote = await Note.findByIdAndUpdate(id , {title , content } , {new : true});

        res.status(200).send(UpdatedNote)

    } catch (error) {
        console.error(" Error updating the note");
        res.status(500).json({message: error.message });
    }
}

export async function deleteNote(req, res) {
    try {
        const id = req.params.id;
        const {title , content} = req.body;

        const DeletedNote = await Note.findByIdAndDelete(id , {title , content } , {new : true});

        res.status(200).send(Note.id)

    } catch (error) {
        console.error(" Error updating the note");
        res.status(500).json({message: error.message });
    }
}