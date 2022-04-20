import { container } from 'tsyringe';

import { JWTAuthService } from './AuthService/Implementations/JWTAuthService';
import { IJWTAuthService } from './AuthService/models/IJWTAuthService';

container.registerSingleton<IJWTAuthService>('JWTAuthService', JWTAuthService);
