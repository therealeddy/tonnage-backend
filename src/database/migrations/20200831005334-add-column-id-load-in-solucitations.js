module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('solicitations', 'id_load', {
      type: Sequelize.INTEGER,
      references: { model: 'loads', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('solicitations', 'id_load');
  },
};
