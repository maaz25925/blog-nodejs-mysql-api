const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const checkAuthMiddleware = require('../middlewares/checkAuth');

router.post('/', checkAuthMiddleware.checkAuth, postController.save);
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.patch('/:id', checkAuthMiddleware.checkAuth, postController.update);
router.delete('/:id', checkAuthMiddleware.checkAuth, postController.destroy);

module.exports = router;
