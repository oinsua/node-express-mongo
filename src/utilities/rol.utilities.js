const rolModel = require("../model/rol.model");


const getRoles = async ({ roles, newUser }) => {
    try {
        if (typeof (roles) !== 'undefined') {
            const arrayRol = await rolModel.findById(roles[0]);
            newUser.rol = arrayRol._id;
        } else {
            const rolUser = await rolModel.find({ name: "user" });
            newUser.rol = [rolUser[0]._id];
        }
        return newUser;
    } catch (error) {
        console.log(error)
    }
};

const getRole = async ({ id }) => {
    console.log('id: ', id)
    if (typeof (id) !== 'undefined') {
        const rol = await rolModel.findById(id);
        return [rol._id];
    }
    return null;
};

const getPermissionUser = async ({ id }) => {
    console.log('id: ', id)
    if (typeof (id) !== 'undefined') {
        const rol = await rolModel.findById(id);
        return rol.permission;
    }
    return '';
}

module.exports = {
    getRoles,
    getRole,
    getPermissionUser
};