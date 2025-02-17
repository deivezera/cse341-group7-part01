const express = require('express');
const router = express.Router();

const ownerController = require('../controllers/owners');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', ownerController.getAllOwners);

router.get('/:id', ownerController.getSingleOwner);

router.post('/', isAuthenticated, validation.saveOwner, ownerController.createOwner)

router.put('/:id', isAuthenticated, validation.saveOwner, ownerController.updateOwner)

router.delete('/:id', isAuthenticated, ownerController.deleteOwner)


module.exports = router; 