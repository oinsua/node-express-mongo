const { Router } = require('express');
const { getAllUser, getOneUser, createUser, updateUser, deleteUser } = require('../../controller/user');
const { loginUser } = require('../../controller/user/login');

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUser);
router.get('/:id', getOneUser);
router.post('/', loginUser);

module.exports = router;