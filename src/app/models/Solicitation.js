import Sequelize, { Model } from 'sequelize';

class Solicitation extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
        description: Sequelize.STRING,
        collection_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
    this.belongsTo(models.User, {
      foreignKey: 'id_user_trucker',
      as: 'user_trucker',
    });
    this.belongsTo(models.Route, { foreignKey: 'id_route', as: 'route' });
    this.belongsTo(models.Transaction, {
      foreignKey: 'id_transaction',
      as: 'transaction',
    });
    this.belongsTo(models.Evaluation, {
      foreignKey: 'id_evaluation',
      as: 'evaluation',
    });
  }
}

export default Solicitation;
