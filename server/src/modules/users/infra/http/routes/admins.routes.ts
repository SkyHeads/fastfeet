import { Router } from 'express';

import { AdminsController } from '../controllers/AdminsController';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

export const adminsRouter = Router();

const adminsController = new AdminsController();

// adminsRouter.post('/', ensureAuthenticated, adminsController.create);
adminsRouter.post('/', adminsController.create);
