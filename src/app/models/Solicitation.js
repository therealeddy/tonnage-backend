import Sequelize, { Model } from 'sequelize';

class Solicitation extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Route, { foreignKey: 'id_route', as: 'route' });
  }
}

export default Solicitation;
