import Sequelize, { Model } from 'sequelize';

class Route extends Model {
  static init(sequelize) {
    super.init(
      {
        destination_address: Sequelize.STRING,
        destination_latitude: Sequelize.STRING,
        destination_longitude: Sequelize.STRING,
        origin_address: Sequelize.STRING,
        origin_latitude: Sequelize.STRING,
        origin_longitude: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Route;
