const express = require('express');
const { note, user, task } = require('../controllers');

const router = express.Router();

router.post('/user/login', user.userLogin);
router.post('/user/logout', user.userLogout);
router.post('/user/register', user.userRegister);
router.post('/user/deletechild', user.deleteChild);

router.post('/addTask', task.addTask);
router.post('/deleteTask', task.deleteTask);
router.post('/taskDone', task.taskDone);
router.post('/taskImprove', task.taskImprove);

router.post('/confirmDoneTask', task.confirmDoneTask);

router.post('/addPrize', user.addPrize);
router.post('/deletePrize', user.deletePrize);
router.post('/purchasePrize', user.purchasePrize);
router.post('/prizeRealized', user.prizeRealized);

router.get('/fetchChilds', user.fetchChilds);
router.get('/fetchPrizes', user.fetchPrizes);
router.get('/fetchEvents', user.fetchEvents);
router.get('/fetchPurchasedPrizes', user.fetchPurchasedPrizes);

module.exports = router;
