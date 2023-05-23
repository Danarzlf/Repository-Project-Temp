'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    carName: DataTypes.STRING,
    rentPrice: DataTypes.INTEGER,
    size: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Car',
  },
    Car.findCar = async function (value) {
      const product = await Car.findOne(
        {
          where: {
            id: value
          }
        }
      );
      return product;
    },
  );

  Car.associate = function (models) {
    Car.hasMany(models.History, {
      foreignKey: 'carId'
    });
  };
  return Car;
};