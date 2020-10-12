import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        id_pagarme: Sequelize.INTEGER,
        name_load: Sequelize.STRING,
        description_load: Sequelize.STRING,
        price_load: Sequelize.FLOAT,
        price_per_kilometer: Sequelize.FLOAT,
        price_total: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Transaction;
