const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');
const rolModel = require('../../model/rol.model');
const userModel = require('../../model/user.model');

const createUser = async (req, res) => {
    try {
        const { user, email, password, rol } = req.body;

        const newUser = new userModel({
            user,
            email,
            password: await userModel.encrytPassword(password),
        });

        if (typeof (rol) !== 'undefined') {
            const rols = await rolModel.find({ name: { $in: rol } });
            user.rol = rols.map(rol => rol === rol._id);
        } else {
            const rolUser = await rolModel.find({ name: "user" });
            user.rol = [rolUser._id];
        }

        const userInsert = await newUser.save();

        const token = jwt.sign({ id: userInsert._id }, SECRET, { expiresIn: 86400 });

        res.status(200).json({ message: "OK", token })
    } catch (error) {
        console.log(error);
    }
};

const getAllUser = (req, res) => {
    res.status(200).send("Return of getAllUser")
};

const getOneUser = (req, res) => {
    console.log(req.params)
    res.status(200).send("Return the getOneUser")
};


module.exports = {
    getAllUser,
    getOneUser,
    createUser
}