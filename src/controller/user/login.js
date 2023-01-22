const userModel = require("../../model/user.model");
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config');

const loginUser = async (req, res, next) => {
    try {
        const { user, password } = req.body;

        const existUser = await userModel.find({ user: user }).select('user password');

        if (existUser.length === 0) {
            return res.status(200).json({ message: "Not Content User" });
        }

        const isTrue = await userModel.comparePassword(password, existUser[0].password);
        if (isTrue) {
            const token = jwt.sign({ id: existUser[0]._id }, SECRET, { expiresIn: 86400 });

            return res.status(201).json({ message: "OK", token })
        }
        return res.status(200).json({ message: "Incorrect Password" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    loginUser,
};