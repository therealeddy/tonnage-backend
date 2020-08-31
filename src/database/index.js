import Sequelize from 'sequelize';

import Truck from '../app/models/Truck';
import Configuration from '../app/models/Configuration';
import Solicitation from '../app/models/Solicitation';
import Route from '../app/models/Route';
import History from '../app/models/History';
import User from '../app/models/User';
import Role from '../app/models/Role';
import Card from '../app/models/Card';
import Load from '../app/models/Load';

import databaseConfig from '../config/database';

const models = [
  Truck,
  Configuration,
  Solicitation,
  Route,
  History,
  User,
  Role,
  Card,
  Load,
];

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
