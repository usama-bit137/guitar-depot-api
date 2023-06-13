const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Guitars = require('../models/guitarModel');

dotenv.config({ path: `${__dirname}/../config.env` });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB connection successful 👌');
  });

const guitars = JSON.parse(fs.readFileSync(`${__dirname}/data.json`), 'utf-8');

const importData = async () => {
  try {
    await Guitars.create(guitars);
    console.log('Data successfully loaded 🎸');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Guitars.deleteMany();
    console.log('Data successfully deleted 🎸');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
