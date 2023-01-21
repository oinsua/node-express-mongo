const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    user: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    rol: [
        {
            ref: "Rol",
            type: Schema.Types.ObjectId
        }
    ],
},
    {
        timestamps: true
    });

UserSchema.static({
    encrytPassword: async (password) => {
        try {
            const res = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, res);
        } catch (error) {
            console.log(error)
        }
    },
    comparePassword: async (password, newpassword) => {
        try {
            return await bcrypt.compare(password, newpassword);
        } catch (error) {
            console.log(error);
        }
    }
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = model("User", UserSchema);