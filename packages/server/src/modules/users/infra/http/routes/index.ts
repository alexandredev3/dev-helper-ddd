import { Router } from 'express';

import { authenticationController } from '../../../useCases/Authentication';
import { createUserController } from '../../../useCases/CreateUser';

const userRouter = Router();

userRouter.post('/', (request, response) =>
  createUserController.execute(request, response)
);

userRouter.post('/auth', (request, response) =>
  authenticationController.execute(request, response)
);

export { userRouter };
