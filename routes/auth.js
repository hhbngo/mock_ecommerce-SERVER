const express = require('express');
const router = express.Router();

const {authCheck, adminCheck} = require('../middleware/auth');
const {createUser, currentUser} = require('../controllers/auth');

router.post('/create-user', authCheck, createUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;