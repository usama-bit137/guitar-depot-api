exports.getOverview = (req, res, next) => {
  res.status(200).render('overview', {
    title: 'All Guitars',
  });
};

exports.getGuitar = (req, res, next) => {
  res.status(200).render('guitar', {
    title: 'Fender Stratocaster',
  });
};
