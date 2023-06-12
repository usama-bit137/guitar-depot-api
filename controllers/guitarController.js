const fs = require('fs');

const guitars = JSON.parse(
  fs.readFileSync(`${__dirname}/../devdata/data.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Guitar ID is: ${val}`);
  if (req.param.id * 1 > guitars.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllGuitars = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      guitars,
    },
  });
};

exports.getGuitar = (req, res) => {
  const id = req.params.id * 1;
  const guitar = guitars.find((item) => item.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      guitar,
    },
  });
};

exports.createGuitar = (req, res) => {
  const newId = guitars[guitars.length - 1].id + 1;
  const newGuitar = Object.assign({ id: newId }, req.body);

  guitars.push(newGuitar);
  fs.writeFile(
    `${__dirname}/../devdata/data.json`,
    JSON.stringify(guitars),
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          guitar: newGuitar,
        },
      });
    }
  );
};

exports.updateGuitar = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      guitar: '<Updated guitar here...>',
    },
  });
};

exports.deleteGuitar = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
