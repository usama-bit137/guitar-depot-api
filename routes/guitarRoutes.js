const express = require('express');

const controller = require('../controllers/guitarController');
const router = express.Router();

router.route('/').get(controller.getAllGuitars).post(controller.createGuitar);
router
  .route('/:manufacturer')
  .get(controller.aliasGuitarsByManufacturer, controller.getAllGuitars);
router
  .route('/:id')
  .get(controller.getGuitar)
  .patch(controller.updateGuitar)
  .delete(controller.deleteGuitar);

module.exports = router;
