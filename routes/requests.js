const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requests');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', requestController.getAllRequests);

router.get('/:id', requestController.getSingleRequest);

router.post('/', isAuthenticated, validation.saveRequest, requestController.createRequest)

router.put('/:id', isAuthenticated, validation.saveRequest, requestController.updateRequest)

router.delete('/:id', isAuthenticated, requestController.deleteRequest)


module.exports = router; 