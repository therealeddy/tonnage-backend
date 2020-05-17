import { Router } from 'express';

import TruckController from './app/controllers/TruckController';
import ConfigurationController from './app/controllers/ConfigurationController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ api: true });
});

routes.get('/trucks', TruckController.index);
routes.get('/trucks/:id', TruckController.show);
routes.post('/trucks', TruckController.store);
routes.put('/trucks/:id', TruckController.update);
routes.delete('/trucks/:id', TruckController.delete);

routes.get('/configurations', ConfigurationController.index);
routes.put('/configurations', ConfigurationController.update);

export default routes;
