const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const imageUploader = require('../helpers/imageUploader');
const checkAuthMiddleware = require('../middlewares/checkAuth');

router.post('/upload', checkAuthMiddleware.checkAuth, imageUploader.upload.single('image'), imageController.upload);

module.exports = router;