module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('solicitations', 'id_load');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('solicitations', 'id_load', {
      type: Sequelize.INTEGER,
      references: { model: 'loads', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },
};
