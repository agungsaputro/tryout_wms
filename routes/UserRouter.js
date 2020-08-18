const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.get('/', UserController.getUser );
router.get('/:id', UserController.getUserById );
router.post('/', UserController.saveUser );
router.patch('/:id', UserController.updateUserById );
router.delete('/:id', UserController.deleteUserById);


module.exports = router;