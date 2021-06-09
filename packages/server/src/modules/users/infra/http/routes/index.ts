import { Router } from 'express';

import { createUserController } from '../../../useCases/CreateUser';

const userRouter = Router();

userRouter.post('/', (request, response) =>
  createUserController.execute(request, response)
);

export { userRouter };
