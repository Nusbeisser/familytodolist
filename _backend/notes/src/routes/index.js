const express = require('express');
const { note, user, task } = require('../controllers');

const router = express.Router();

router.post('/user/login', user.userLogin);
router.post('/user/logout', user.userLogout);
router.post('/user/register', user.userRegister);
router.post('/user/deletechild', user.deleteChild);

router.post('/addTask', task.addTask);
router.post('/deleteTask', task.deleteTask);
router.post('/confirmDoneTask', task.confirmDoneTask);

router.get('/fetchChilds', user.fetchChilds);

router.get('/notes', note.getAllNotes);
router.get('/notes/type', note.getAllNotesOfOneType);

router.post('/note', note.addNote);
router.get('/note/:id', note.getSingleNote);
router.put('/note/:id', note.updateNote);
router.delete('/note/:id', note.deleteNote);

module.exports = router;
