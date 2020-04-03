import Sequelize, { Model } from 'sequelize';

class Truck extends Model {
  static init(sequelize) {
    super.init(
      {
        board: Sequelize.STRING,
        model: Sequelize.STRING,
        brand: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Truck;
