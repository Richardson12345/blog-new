var express = require('express');
var router = express.Router();
var commentController = require('../controller/commentController');

router.post('/', commentController.createComment);
router.get('/:blog', commentController.getComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router