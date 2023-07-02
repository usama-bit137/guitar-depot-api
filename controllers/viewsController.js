const Guitar = require('../models/guitarModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const guitars = await Guitar.find();

  res.status(200).render('overview', {
    title: 'All Guitars',
    guitars,
  });
});

exports.getGuitar = catchAsync(async (req, res, next) => {
  // 1) get the data for the guitar
  const guitar = await Guitar.findOne({ slug: req.params.slug });
  res.status(200).render('guitar', {
    guitar,
  });
});
