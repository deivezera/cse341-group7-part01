const express = require('express');
const router = express.Router();

const dogsController = require('../controllers/dogs');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', dogsController.getAllDogs);

router.get('/:id', dogsController.getSingleDog);

router.post('/', isAuthenticated, validation.saveDog, dogsController.createDog)

router.put('/:id', isAuthenticated, validation.saveDog, dogsController.updateDog)

router.delete('/:id', isAuthenticated, dogsController.deleteDog)


module.exports = router;