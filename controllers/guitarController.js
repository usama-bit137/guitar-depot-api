const Guitar = require(`../models/guitarModel`);
const APIFeatures = require('../utils/APIFeatures');

// exports.aliasGuitarsByManufacturer = (req, res, next) => {
//   // Middleware function which sends the guitars by manufacturer:
//   let manufacturer = req.params.manufacturer;
//   manufacturer = manufacturer.split('-').map((item) => {
//     return item[0].toUpperCase() + item.slice(1);
//   });
//   req.query.manufacturer = manufacturer.join(' ');
//   next();
// };

exports.aliasGuitarBySlug = (req, res, next) => {
  req.query.slug = req.params.slug;
  next();
};

exports.getAllGuitars = async (req, res) => {
  try {
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
  } catch (err) {
    res.send(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getGuitar = async (req, res) => {
  try {
    const guitar = await Guitar.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        guitar,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createGuitar = async (req, res) => {
  try {
    const newGuitar = await Guitar.create(req.body);
    res.status(201).send({
      status: 'success',
      data: {
        guitar: newGuitar,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateGuitar = async (req, res) => {
  try {
    const guitar = await Guitar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        guitar,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteGuitar = async (req, res) => {
  try {
    await Guitar.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getGuitarStats = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
