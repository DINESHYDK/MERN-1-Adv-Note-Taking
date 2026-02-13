import mongoose from "mongoose";

//1 - Create a schema
// 2. model based off of that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },
    {timestamps: true} // createdAt and updatedAt fields was given by mongoDB
);

const Note = mongoose.model("Note", noteSchema);

export default Note;