const { History } = require('../models');

module.exports = {
  create(carId, description) {
    return History.create({
      carId,
      description
    });
  },

  find(id) {
    return History.findOne({
      where: {
        carId: id
      }
    });
  },

  seeHistory(carId) {
    return History.findAll({
      where: {
        carId
      },
      attributes: [
        'carId',
        'description',
        ['createdAt', 'atTime'],
      ]
    });
  }
};