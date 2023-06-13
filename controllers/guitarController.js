const Guitar = require(`../models/guitarModel`);

exports.getAllGuitars = async (req, res) => {
  try {
    // BUILD QUERY
    // 1) Filtering:
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced Filtering:
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // EXECUTE QUERY
    const query = Guitar.find(JSON.parse(queryStr));

    // SEND RESPONSE
    const guitars = await query;

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
    console.log();
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
