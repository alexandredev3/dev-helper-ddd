import { Request } from 'express';

import { IJWTClaims } from '../../../domain/User/JWT';

export interface IDecodedExpressRequest extends Request {
  jwtDecoded: IJWTClaims;
}
