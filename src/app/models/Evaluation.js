import Sequelize, { Model } from 'sequelize';

class Evaluation extends Model {
  static init(sequelize) {
    super.init(
      {
        evaluation: Sequelize.INTEGER,
        comment: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Evaluation;
