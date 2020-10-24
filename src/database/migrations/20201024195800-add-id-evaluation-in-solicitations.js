module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('solicitations', 'id_evaluation', {
      type: Sequelize.INTEGER,
      references: { model: 'evaluations', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('solicitations', 'id_evaluation');
  },
};
