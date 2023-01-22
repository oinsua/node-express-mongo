const { Router } = require('express');
const { check } = require('express-validator');
const { getAllUser, getOneUser, createUser, updateUser, deleteUser } = require('../../controller/user');
const { loginUser } = require('../../controller/user/login');

const router = Router();

router.post('/',
    [
        check('user').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
        check('email', 'email is malfomed').normalizeEmail().isEmail(),
        check('password')
            .isLength({ min: 5 }).withMessage('must be at least 3 chars long')
            .matches(/\d/).withMessage('must contain a number'),
    ],
    createUser);
router.put('/:id',
    [
        check('id').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
        check('user').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
        check('email', 'email is malfomed').normalizeEmail().isEmail(),
        check('password')
            .isLength({ min: 5 }).withMessage('must be at least 3 chars long')
            .matches(/\d/).withMessage('must contain a number'),
    ],
    updateUser);
router.delete('/:id',
    [
        check('id').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    ],
    deleteUser);
router.get('/', getAllUser);
router.get('/:id',
    [
        check('id').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    ],
    getOneUser);
router.post('/login',
    [
        check('user').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
        check('password')
            .isLength({ min: 5 }).withMessage('must be at least 3 chars long')
            .matches(/\d/).withMessage('must contain a number'),
    ],
    loginUser);

module.exports = router;