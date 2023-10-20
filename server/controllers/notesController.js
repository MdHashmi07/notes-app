import NotesModel from "../models/notesModel.js";

//@desc Get all notes
//@router GET api/notes/get-all-notes
//@access public

export const getAllNotes = async(request, response) => {
    try {
        const notes = await NotesModel.find();
        response.status(200).json({notes: notes})
    }catch(error) {
        response.status(400).json({error: error.message});
    }
}

//@desc POST all notes
//@router POST api/notes/create-notes
//@access public

export const createNotes = async(request, response) => {

    const {title, description} = request.body;
    console.log(request.body);

    if(!title || !description) {
        response.status(404).json({error: "All fields are mandatory"});
    }

    const Notes = await NotesModel.create({
        title,
        description
    });

    if(Notes) {
        response.status(201).json({message: "Note is created", Notes});
    }else{
        response.status(400).json({error: "Note not created"});
    }
}

//@desc Get a notes
//@router GET api/notes/get-note/:id
//@access public

export const getNote = async(request, response) => {
    try {
        const note = await NotesModel.findById(request.params.id);
        response.status(200).json({note: note})
    }catch(error) {
        response.status(400).json({error: error.message});
    }
}

//@desc update a notes
//@router UPDATE api/notes/get-note/:id
//@access public

export const updateNote = async(request, response) => {
    try {
        const note = await NotesModel.findById(request.params.id);

        if(!note) {
            response.status(400).json({error: "Note not found!!"});
        }else {
            const updateNote =  await NotesModel.findByIdAndUpdate(
                request.params.id,
                request.body,
                { new : true }
            );
            response.status(200).json({message:"Note updated successfully!!", updateNote});
        }
    }catch(error) {
            response.status(400).json({error:error});
    }
}

//@desc delete a notes
//@router delete api/notes/get-note/:id
//@access public

export const deleteNote = async(request, response) => {
    try {
        const note = await NotesModel.findById(request.params.id);

        if(!note) {
            response.status(400).json({error: "Note not found!!"});
        }else {
            await NotesModel.deleteOne({_id:request.params.id});
            response.status(200).json({message:"Note deleted successfully!!", note});
        }
    }catch(error) {
            response.status(400).json({error:error});
    }
}