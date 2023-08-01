const Guitar = require(`../models/guitarModel`);
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.getAllGuitars = factory.getAll(Guitar);
exports.getGuitar = factory.getOne(Guitar);
exports.createGuitar = factory.createOne(Guitar);
exports.updateGuitar = factory.updateOne(Guitar);
exports.deleteGuitar = factory.deleteOne(Guitar);

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
