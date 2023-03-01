const userModel = require("../../model/user.model");
const RefreshToken = require('../../model/refreskToken.model')
const jwt = require('jsonwebtoken');
const { SECRET, JWT_REFRESK_EXPIRATION } = require('../../config');
const { getPermissionUser } = require("../../utilities/rol.utilities");
const { validate: uuidValidate } = require('uuid');

const loginUser = async (req, res, next) => {
    try {
        const { user, password } = req.body;

        const existUser = await userModel.find({ user: user });

        if (existUser.length === 0) {
            return res.status(404).json({ message: "User Not Found!" });
        }

        const isTrue = await userModel.comparePassword(password, existUser[0].password);
        if (isTrue) {

            const token = jwt.sign({ id: existUser[0]._id }, SECRET, { expiresIn: JWT_REFRESK_EXPIRATION });

            const refreshToken = await RefreshToken.createToken(existUser[0]);

            let authorities = [];

            for (let i = 0; i < existUser[0].rol.length; i++) {
                let permission = await getPermissionUser({ id: existUser[0].rol[i] })
                authorities.push("ROLE_" + permission.toUpperCase());
            }

            return res.status(200).json({
                id: existUser[0]._id,
                username: existUser[0].username,
                email: existUser[0].email,
                roles: authorities,
                accessToken: token,
                refreshToken,
            })
        }
        return res.status(401).json({ message: "Incorrect Password", token: null });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    if (!uuidValidate(requestToken)) {
        return res.status(403).json({ message: "Invalid Refresh Token!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        let newAccessToken = jwt.sign({ id: refreshToken._id }, SECRET, { expiresIn: JWT_REFRESK_EXPIRATION });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

module.exports = {
    loginUser,
    refreshToken
};