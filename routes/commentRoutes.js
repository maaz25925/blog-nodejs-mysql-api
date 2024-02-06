const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/', commentController.save);
router.get('/', commentController.getAll);
router.get('/:id', commentController.show);
router.patch('/:id', commentController.update);
router.delete('/:id', commentController.destroy);

module.exports = router;
