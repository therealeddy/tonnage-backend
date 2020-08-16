import Sequelize, { Model } from 'sequelize';

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        role: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
  }
}

export default Role;
