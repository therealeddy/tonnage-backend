module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_pagarme: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      name_load: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description_load: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price_load: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      price_per_kilometer: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      price_total: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('transactions');
  },
};
