const carService = require('../../services/carService');

module.exports = {
  async createCar(req, res, next) {
    try {
      const { carName, rentPrice, size } = req.body;
      const user = req.fullName;

      if (carName == null) {
        return res.status(400).json({ message: "body required" });
      }

      const result = await carService.createCar(carName, rentPrice, size, user);
      result.status == 'failed' ? res.status(401).json(result) : res.status(201).json(result);
    } catch (err) {
      console.log('ini')
      next(err);
    }
  },

  async getCars(req, res, next) {
    try {
      const result = await carService.list();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async updateCar(req, res, next) {
    try {
      const id = req.params.id;
      const user = req.fullName;
      const result = await carService.updateCar(id, req.body, user);
      result.status == 'failed'
        ? res.status(404).json(result)
        : res.status(200).json({ 'data': result });
    } catch (err) {
      next(err);
    }
  },

  async deleteCar(req, res, next) {
    try {
      const id = req.params.id;
      const user = req.fullName;

      const result = await carService.deleteCar(id, user);

      result.status == 'failed'
        ? res.status(404).json(result)
        : res.status(200).json({ 'data': result });

    } catch (err) {
      next(err);
    }
  },

  async getCarById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await carService.getCarById(id);
      result.status == 'failed'
        ? res.status(404).json(result)
        : res.status(200).json({ 'data': result });

    } catch (err) {
      next(err);
    }
  },

  getCarHistory(req, res, next) {
    try {
      const carsId = req.params.id;

      carService.getCarHistory(carsId).then(result => {
        result.status == 'failed'
          ? res.status(404).json(result)
          : res.status(200).json(result);
      });
    } catch (err) {
      next(err);
    }
  }
};