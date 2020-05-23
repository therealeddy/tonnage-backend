import { Router } from 'express';

import TruckController from './app/controllers/TruckController';
import ConfigurationController from './app/controllers/ConfigurationController';
import SolicitationController from './app/controllers/SolicitationController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ api: true });
});

routes.get('/trucks', TruckController.index);
routes.get('/trucks/:id', TruckController.show);
routes.post('/trucks', TruckController.store);
routes.put('/trucks/:id', TruckController.update);
routes.delete('/trucks/:id', TruckController.delete);

routes.get('/requests', SolicitationController.index);
routes.get('/requests/:id', SolicitationController.show);
routes.post('/requests', SolicitationController.store);
routes.put('/requests/:id', SolicitationController.update);

routes.get('/configurations', ConfigurationController.index);

export default routes;
