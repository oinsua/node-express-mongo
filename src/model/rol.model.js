const { Schema, model } = require("mongoose");

const RolSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    permission: {
        type: String,
        required: true,
        trim: true
    }
});

RolSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = model("Rol", RolSchema);
