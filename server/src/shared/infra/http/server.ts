import 'reflect-metadata';

import express from 'express';

import { routes } from './routes';

import '@shared/infra/typeorm';

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(routes);
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
