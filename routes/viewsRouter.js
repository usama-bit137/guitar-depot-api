const express = require('express');
const controller = require('../controllers/viewsController');
const router = express.Router();

// Leave this out of the controller file:
router.get('/', (req, res, next) => {
  res.status(200).render('base', {
    guitar: 'Fender Stratocaster',
    user: 'Usama',
  });
});

router.get('/overview', controller.getOverview);
router.get('/guitar/:slug', controller.getGuitar);

module.exports = router;
