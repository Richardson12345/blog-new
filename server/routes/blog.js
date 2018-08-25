var express = require('express');
var router = express.Router();
var blogController = require('../controller/blogController');
var images = require('../helpers/images')

/* GET home page. */
router.post('/', blogController.addBlog);
router.get('/', blogController.readBlog);
router.get('/one/:id', blogController.readOne);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
router.post('/multer', images.multer.single('image'), images.sendUploadToGCS, blogController.uploadImage);

module.exports = router;
