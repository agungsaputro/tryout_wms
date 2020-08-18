const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const { multerUploads } = require("../controllers/UploadController");

router.get('/', ProductController.getProduct );
router.get('/:id', ProductController.getProductById );
router.post('/', multerUploads, ProductController.saveProduct );
router.patch('/:id', ProductController.updateProduct );
router.delete('/:id', ProductController.deleteProductById);


module.exports = router;