const express = require('express');
const router = express.Router();

const sheltersController = require('../controllers/shelters');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', sheltersController.getAllShelters);

router.get('/:id', sheltersController.getSingleShelter);

router.post('/', isAuthenticated, validation.saveCharacter, sheltersController.createShelter)

router.put('/:id', isAuthenticated, validation.saveCharacter, sheltersController.updateShelter)

router.delete('/:id', isAuthenticated, sheltersController.deleteShelter)


module.exports = router;