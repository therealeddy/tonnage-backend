module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('trucks', 'id_user_trucker', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('trucks', 'id_user_trucker');
  },
};
