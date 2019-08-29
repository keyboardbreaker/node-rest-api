const express = require('express');
const router = express.Router();
const opportunityController = require('../app/api/controllers/opportunities');
router.get('/', opportunityController.getAll);
router.post('/', opportunityController.create);
router.get('/:opportunityId', opportunityController.getById);
router.put('/:opportunityId', opportunityController.updateById);
router.delete('/:opportunityId', opportunityController.deleteById);
module.exports = router;