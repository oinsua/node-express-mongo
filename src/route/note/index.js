const { Router } = require('express');
const { check } = require('express-validator');
const { getNotes, createNote, updateNote, deleteNote, getOneNote } = require('../../controller/note');

const router = Router();

router.post('/',
    [
        check('title').isLength({ min: 3, max: 10 }).withMessage('must be between 3 and 5 chars long'),
        check('content').isLength({ min: 5 }).withMessage('must be at least 3 chars long'),
        check('important').not().isEmpty()

    ],
    createNote);
router.put('/:id',
    [
        check('id').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
        check('title').isLength({ min: 3, max: 10 }).withMessage('must be between 3 and 5 chars long'),
        check('content').isLength({ min: 5 }).withMessage('must be at least 3 chars long'),
        check('important').not().isEmpty()

    ],
    updateNote);
router.delete('/:id',
    [
        check('id').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    ],
    deleteNote);
router.get('/:id',
    [
        check('id').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    ], getOneNote);
router.get('/', getNotes);

module.exports = router;