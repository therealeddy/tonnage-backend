import { Router } from 'express';

import TruckController from './app/controllers/TruckController';
import TruckAssociationController from './app/controllers/TruckAssociationController';
import TruckTruckerController from './app/controllers/TruckTruckerController';
import ConfigurationController from './app/controllers/ConfigurationController';
import SolicitationController from './app/controllers/SolicitationController';
import SolicitationAdminController from './app/controllers/SolicitationAdminController';
import SolicitationTruckerController from './app/controllers/SolicitationTruckerController';
import HistoryController from './app/controllers/HistoryController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CardController from './app/controllers/CardController';
import LoadController from './app/controllers/LoadController';
import ManagementReportController from './app/controllers/ManagementReportController';
import PersonalReportController from './app/controllers/PersonalReportController';
import UserUpdateController from './app/controllers/UserUpdateController';
import EvaluationController from './app/controllers/EvaluationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ api: true });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/trucks', TruckController.index);
routes.get('/trucks/:id', TruckController.show);
routes.post('/trucks', TruckController.store);
routes.put('/trucks/:id', TruckController.update);
routes.delete('/trucks/:id', TruckController.delete);

routes.get('/trucks-association', TruckAssociationController.index);
routes.get('/trucks-association/:id', TruckAssociationController.show);

routes.get('/truck-trucker', TruckTruckerController.index);

routes.get('/loads', LoadController.index);
routes.get('/loads/:id', LoadController.show);
routes.post('/loads', LoadController.store);
routes.put('/loads/:id', LoadController.update);
routes.delete('/loads/:id', LoadController.delete);

routes.get('/cards', CardController.index);
routes.post('/cards', CardController.store);
routes.delete('/cards', CardController.delete);

routes.get('/requests', SolicitationController.index);
routes.get('/requests/:id', SolicitationController.show);
routes.post('/requests', SolicitationController.store);

routes.get('/requests-admin', SolicitationAdminController.index);
routes.get('/requests-admin/:id', SolicitationAdminController.show);
routes.put('/requests-admin/:id', SolicitationAdminController.update);

routes.get('/requests-trucker', SolicitationTruckerController.index);
routes.get('/requests-trucker/:id', SolicitationTruckerController.show);
routes.put('/requests-trucker/:id', SolicitationTruckerController.update);

routes.get('/histories', HistoryController.index);
routes.get('/histories/:id', HistoryController.show);

routes.get('/management-report', ManagementReportController.index);
routes.get('/personal-report', PersonalReportController.index);

routes.get('/user-update', UserUpdateController.index);
routes.put('/user-update', UserUpdateController.update);

routes.get('/configurations', ConfigurationController.index);
routes.put('/configurations', ConfigurationController.update);

routes.post('/evaluation', EvaluationController.store);

export default routes;
