const express = require('express');
const controller = require('../controllers/guitarController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(authController.protect, controller.getAllGuitars)
  .post(authController.protect, controller.createGuitar);

router.route('/guitar-stats').get(controller.getGuitarStats);

// Middleware stack cannot delineate between /:id and /:slug, so
// we will comment it out:
// router
//   .route('/:slug')
//   .get(controller.aliasGuitarBySlug, controller.getAllGuitars);

router
  .route('/:id')
  .get(controller.getGuitar)
  .patch(controller.updateGuitar)
  .delete(controller.deleteGuitar);

module.exports = router;
