const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');
const rolModel = require('../../model/rol.model');
const userModel = require('../../model/user.model');

const createUser = async (req, res, next) => {
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

        res.status(201).json({ message: "OK", token })
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const allUser = await userModel.find({});
        res.status(200).json(allUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getOneUser = async (req, res, next) => {
    console.log(req.params)
    res.status(200).send("Return the getOneUser")
    try {
        const user = await userModel.find({ user: req.params.user });

        if (typeof (user) !== 'undefined') {
            res.status(200).json(user);
        } else {
            res.status(204).json({ message: "not found" })
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports = {
    getAllUser,
    getOneUser,
    createUser
}