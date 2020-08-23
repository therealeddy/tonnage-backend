import Sequelize, { Model } from 'sequelize';

class History extends Model {
  static init(sequelize) {
    super.init(
      {
        action: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Route, {
      foreignKey: 'id_solicitation',
      as: 'solicitation',
    });
    this.belongsTo(models.Route, {
      foreignKey: 'id_user',
      as: 'user',
    });
  }
}

export default History;
