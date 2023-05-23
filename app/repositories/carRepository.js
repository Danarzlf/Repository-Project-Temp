const { Car } = require('../models');

module.exports = {
  create(carName, rentPrice, size) {
    return Car.create({
      carName,
      rentPrice,
      size
    });
  },

  findAll() {
    return Car.findAll();
  },

  find(id) {
    return Car.findByPk(id);
  },

  update(id, updateArgs) {
    return Car.update(updateArgs, {
      where: {
        id
      }
    });
  },

  delete(id) {
    return Car.destroy({
      where: {
        id
      }
    });
  },

  getTotalCar() {
    return Car.count();
  },
};