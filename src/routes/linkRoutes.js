const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');


// Define endpoints
router.post('/createLink', linkController.createLink);
router.post('/deleteLink', linkController.deleteLink);
router.post('/deactiveLink', linkController.deactiveLink);

module.exports = router;
