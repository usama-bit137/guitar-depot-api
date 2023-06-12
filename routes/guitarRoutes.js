const express = require('express');
const controller = require('../controllers/guitarController');

const router = express.Router();
router.param('id', controller.checkID);
router
  .route('/')
  .get(controller.getAllGuitars)
  .post(controller.createGuitar);

router
  .route('/:id')
  .get(controller.getGuitar)
  .patch(controller.updateGuitar)
  .delete(controller.deleteGuitar);

module.exports = router;
