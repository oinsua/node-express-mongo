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

module.exports = model("Rol", RolSchema);
