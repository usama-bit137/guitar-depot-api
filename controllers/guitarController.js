const Guitar = require(`../models/guitarModel`);
exports.getAllGuitars = async (req, res) => {
  try {
    // BUILD QUERY
    // 1A) Filtering:
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering:
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // EXECUTE QUERY
    let query = Guitar.find(JSON.parse(queryStr));

    // 2) SORTING:
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('introduced');
    }
    // sorting completed

    // 3) limiting fields
    // limiting fields is the idea of only showing the
    // fields requested by the user in the url

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination:

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    // SEND RESPONSE

    if (req.query.page) {
      const numGuitars = await Guitar.countDocuments();
      if (skip > numGuitars) throw new Error('This page does not exist');
    }

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
