import 'reflect-metadata';
import express from 'express';

import { v1Routes } from './api/v1';

import '@shared/infra/database/typeorm';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use('/api/v1', v1Routes);

app.listen(port, () => console.log(`[Server]: is Listening on port ${port}`));
