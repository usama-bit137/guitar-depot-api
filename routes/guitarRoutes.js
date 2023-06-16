const express = require('express');
const controller = require('../controllers/guitarController');

const router = express.Router();

router.route('/').get(controller.getAllGuitars).post(controller.createGuitar);

router.route('/guitar-stats').get(controller.getGuitarStats);

// Middleware stack cannot delineate between /:id and /:slug, so
// we shall remove this for now
// router
//   .route('/:slug')
//   .get(controller.aliasGuitarBySlug, controller.getAllGuitars);

router
  .route('/:id')
  .get(controller.getGuitar)
  .patch(controller.updateGuitar)
  .delete(controller.deleteGuitar);

module.exports = router;
