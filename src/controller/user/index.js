const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');
const rolModel = require('../../model/rol.model');
const userModel = require('../../model/user.model');
const { getRoles, getRole } = require('../../utilities/rol.utilities');

const createUser = async (req, res, next) => {
    try {
        const { user, email, password, rol } = req.body;

        let newUser = new userModel({
            user,
            email,
            password: await userModel.encrytPassword(password),
        });

        newUser = await getRoles({ roles: rol, newUser });

        const userInsert = await newUser.save();

        const token = jwt.sign({ id: userInsert._id }, SECRET, { expiresIn: 86400 });

        res.status(201).json({ message: "OK", token })
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { user, email, password, rol } = req.body;

        const existUser = await userModel.find({ id });

        if (existUser !== null) {
            const newUser = {
                user,
                email,
                password: await userModel.encrytPassword(password),
                rol: await getRole({ id: rol[0] })
            };

            await userModel.findByIdAndUpdate(id, newUser, { new: true });

            res.status(200).json({ message: "OK" });
        } else {
            res.status(404).json({ message: "Not Found" })
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existUser = await userModel.findById(id);

        if (existUser !== null) {

            const result = await userModel.findByIdAndRemove(id);

            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Not Found" })
        }
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
    try {
        const { id } = req.params;

        const user = await userModel.findById(id);

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUser,
    getOneUser,
}