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

router.post('/addPrize', user.addPrize);
router.post('/deletePrize', user.deletePrize);

router.get('/fetchChilds', user.fetchChilds);
router.get('/fetchPrizes', user.fetchPrizes);

module.exports = router;
