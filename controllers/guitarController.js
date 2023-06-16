const Guitar = require(`../models/guitarModel`);
const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/AppError');
// exports.aliasGuitarsByManufacturer = (req, res, next) => {
//   // Middleware function which sends the guitars by manufacturer:
//   let manufacturer = req.params.manufacturer;
//   manufacturer = manufacturer.split('-').map((item) => {
//     return item[0].toUpperCase() + item.slice(1);
//   });
//   req.query.manufacturer = manufacturer.join(' ');
//   next();
// };

// exports.aliasGuitarBySlug = (req, res, next) => {
//   req.query.slug = req.params.slug;
//   next();
// };

const catchAsync = require('../utils/catchAsync');
exports.getAllGuitars = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Guitar.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const guitars = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      guitars,
    },
  });
});

exports.getGuitar = catchAsync(async (req, res, next) => {
  const guitar = await Guitar.findById(req.params.id);

  if (!guitar) {
    return next(new AppError(`No guitar found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      guitar,
    },
  });
});

exports.createGuitar = catchAsync(async (req, res, next) => {
  const newGuitar = await Guitar.create(req.body);
  res.status(201).send({
    status: 'success',
    data: {
      guitar: newGuitar,
    },
  });
});

exports.updateGuitar = catchAsync(async (req, res, next) => {
  const guitar = await Guitar.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!guitar) {
    return next(new AppError(`No guitar found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      guitar,
    },
  });
});

exports.deleteGuitar = catchAsync(async (req, res, next) => {
  const guitar = await Guitar.findByIdAndDelete(req.params.id);
  if (!guitar) {
    return next(new AppError(`No guitar found with ID: ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getGuitarStats = catchAsync(async (req, res, next) => {
  const stats = await Guitar.aggregate([
    {
      $match: { introduced: { $gte: 1950 } },
    },
    {
      $group: {
        _id: { $toUpper: '$manufacturer' },
        numGuitars: { $sum: 1 },
        avgScale: { $avg: '$scale' },
        avgIntroduced: { $avg: '$introduced' },
      },
    },
    { $sort: { introduced: 1 } },
    {
      $project: {
        numGuitars: 1,
        avgScale: { $round: ['$avgScale', 2] },
        avgIntroduced: { $round: ['$avgIntroduced', 0] },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
