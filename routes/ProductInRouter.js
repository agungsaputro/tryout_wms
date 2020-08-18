const express = require("express");
const router = express.Router();

const Controller = require("../controllers/ProductInController");

router.get('/', Controller.getProductIn );
router.get('/:id', Controller.getProductInById );
router.post('/', Controller.saveProductIn );
router.patch('/:id', Controller.updateProductIn );
router.delete('/:id', Controller.deleteProductIn);


module.exports = router;


