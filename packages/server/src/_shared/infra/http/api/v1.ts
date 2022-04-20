import { Router } from 'express';

import { userRouter } from '@modules/users/infra/http/routes';

const v1Routes = Router();

v1Routes.get('/', (request, response) => response.send('We are up!!'));

v1Routes.use('/users', userRouter);

export { v1Routes };
