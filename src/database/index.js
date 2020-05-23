import Sequelize from 'sequelize';

import Truck from '../app/models/Truck';
import Configuration from '../app/models/Configuration';
import Solicitation from '../app/models/Solicitation';
import Route from '../app/models/Route';

import databaseConfig from '../config/database';

const models = [Truck, Configuration, Solicitation, Route];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
