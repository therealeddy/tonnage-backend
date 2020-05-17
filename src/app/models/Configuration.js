import Sequelize, { Model } from 'sequelize';

class Configuration extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.STRING,
        price_per_kilometer: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Configuration;
