const { Router } = require('express');
const { getAllUser, getOneUser, createUser } = require('../../controller/user');

const router = Router();

router.get('/', getAllUser);
router.get('/:id', getOneUser);
router.post('/', createUser);

module.exports = router;