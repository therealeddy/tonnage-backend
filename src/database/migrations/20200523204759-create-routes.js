module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('routes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      destination_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination_latitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination_longitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      origin_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      origin_latitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      origin_longitude: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('routes');
  },
};
