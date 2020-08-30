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

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'id_user_trucker',
      as: 'user_trucker',
    });
  }
}

export default Truck;
