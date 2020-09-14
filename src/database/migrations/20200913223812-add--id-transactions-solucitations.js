module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('solicitations', 'id_transaction', {
      type: Sequelize.INTEGER,
      references: { model: 'transactions', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('solicitations', 'id_transaction');
  },
};
