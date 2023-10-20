import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please fill title field']
    },
    description: {
        type: String,
        required: [true, 'Please fill description field']
    }
},
{
    timestamps: true
});

const NotesModel = mongoose.model("Notes", notesSchema);

export default NotesModel;