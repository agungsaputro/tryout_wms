const express = require("express");
const router = express.Router();

const Controller = require("../controllers/ProductOutController");

router.get('/', Controller.getProductOut);
router.get('/:id', Controller.getProductOutById );
router.post('/', Controller.saveProductOut );
router.patch('/:id', Controller.updateProductOut );
router.delete('/:id', Controller.deleteProductOut);


module.exports = router;