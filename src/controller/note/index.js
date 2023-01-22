const noteModel = require("../../model/note.model");

const createNote = async (req, res, next) => {
    try {
        const { title, content, important } = req.body;

        const newNote = new noteModel({
            title,
            content,
            important: important ? important : false
        });

        await newNote.save();

        return res.status(200).json({ message: "OK" });
    } catch (error) {
        console.log(error);
        next(error)
    }
};

const updateNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, important } = req.body;

        const existNote = await noteModel.findById(id);

        if (existNote !== null) {

            const result = await noteModel.findByIdAndUpdate(id, { title, content, important });

            return res.status(200).json({ message: "update note", result });
        }
        return res.status(200).json({ message: "Not Found" });
    } catch (error) {
        console.log(error);
        next(error)
    }
};

const deleteNote = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existNote = await noteModel.findById(id);

        if (existNote !== null) {

            const result = await noteModel.findByIdAndRemove(id);

            return res.status(200).json({ message: "delete note", result });
        }
        return res.status(200).json({ message: "Not Found" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getOneNote = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await noteModel.findById(id);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getNotes = async (req, res, next) => {
    try {
        const arrayNotes = await noteModel.find({});
        console.log('arrayNotes: ', arrayNotes)
        res.status(200).json(arrayNotes);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getOneNote,
    getNotes
};