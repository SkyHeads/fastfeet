import { Router } from 'express';

import { SessionsController } from '../controllers/SessionsController';

export const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post('/admins', sessionsController.create);
