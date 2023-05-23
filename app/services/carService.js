const carRepository = require('../repositories/carRepository');
const historyRepository = require('../repositories/historyRepository');

module.exports = {
  createCar(carName, rentPrice, size, user) {
    try {
      let message = `New car successfully ADDED by ${user}.`;

      return carRepository.create(carName, rentPrice, size)
        .then(result => {
          let carId = result.dataValues.id;
          historyRepository.create(carId, message)
            .then(result => {
              return {
                message: result.message
              };
            }).catch(err => {
              return {
                status: 'failed',
                message: err.message
              };
            });
          return {
            message: message,
            data: result
          };
        });
    } catch (err) {
      return {
        status: 'failed',
        message: err.message
      };
    }
  },

  async list() {
    const cars = await carRepository.findAll();
    const carsCount = await carRepository.getTotalCar();

    return {
      data: cars,
      total: carsCount,
    };
  },

  async getCarById(id) {
    const findCar = await carRepository.find(id);

    if (!findCar) {
      return {
        status: 'failed',
        message: `Car with id ${id} is not found.`
      };
    }

    return {
      data: findCar
    };
  },

  async updateCar(id, requestBody, user) {
    const carId = await carRepository.find(id);

    if (!carId) {
      return {
        status: 'failed',
        message: `Car with id ${id} is not found.`
      };
    }

    carRepository.update(id, requestBody);
    const message = `Car with id ${id} successfully UPDATED by ${user}`;
    await historyRepository.create(id, message);

    return {
      message: message,
      data: requestBody
    };
  },

  async deleteCar(id, user) {
    const findCar = await carRepository.find(id);

    if (!findCar) {
      return {
        status: 'failed',
        message: `Car with id ${id} is not found.`
      };
    }

    carRepository.delete(id);
    const message = `Car with id ${id} successfully DELETED by ${user}`;
    await historyRepository.create(id, message);

    return {
      status: 'success',
      message: message
    };
  },

  async getCarHistory(carId) {
    const findCar = await historyRepository.find(carId);

    if (!findCar) {
      return {
        status: 'failed',
        message: `Car with id ${carId} is not found.`
      };
    }

    const histories = await historyRepository.seeHistory(carId);

    return {
      message: `get histories of car with id ${carId}`,
      histories
    };
  }
};