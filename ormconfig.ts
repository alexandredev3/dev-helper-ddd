import { join } from 'path';

import * as config from '@dev-helper/environment';

module.exports = {
  type: config.DEV_HELPER_DB_TYPE,
  host: config.DEV_HELPER_DB_HOST,
  port: config.DEV_HELPER_DB_PORT,
  username: config.DEV_HELPER_DB_USERNAME,
  password: config.DEV_HELPER_DB_PASSWORD,
  database: config.DEV_HELPER_DB_DATABASE,
  logging: config.DEV_HELPER_DB_LOGGING,
  migrations: [
    join(
      __dirname,
      'packages',
      'server',
      'src',
      '_shared',
      'infra',
      'database',
      'typeorm',
      'migrations',
      '*.{js,ts}'
    ),
  ],
  entities: [
    join(
      __dirname,
      'packages',
      'server',
      'src',
      'modules',
      '**',
      'infra',
      'typeorm',
      'entities',
      '*.{ts,js}'
    ),
  ],
  cli: {
    migrationsDir: join(
      __dirname,
      'packages',
      'server',
      'src',
      '_shared',
      'infra',
      'database',
      'typeorm',
      'migrations'
    ),
  },
};
