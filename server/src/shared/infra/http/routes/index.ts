import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/recipients', (req, res) => res.json({ message: 'ok' }));
