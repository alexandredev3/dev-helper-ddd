import { Router } from 'express';

const v1Routes = Router();

v1Routes.get('/', (request, response) => response.send('We are up!!'));

export { v1Routes };
