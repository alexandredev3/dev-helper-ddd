import * as connectionOptions from '@utils/environment';

module.exports = [
  {
    name: 'development',
    type: 'sqlite',
    host: connectionOptions.DEV_HELPER_DB_HOST,
    port: connectionOptions.DEV_HELPER_DB_PORT,
    username: connectionOptions.DEV_HELPER_DB_USERNAME,
    password: connectionOptions.DEV_HELPER_DB_PASSWORD,
    database: './src/_shared/infra/database/typeorm/database.sqlite',
    logging: connectionOptions.DEV_HELPER_DB_LOGGING,
    migrations: ['./src/_shared/infra/database/typeorm/migrations/*[.ts,.js]'],
    entities: ['./src/_shared/infra/database/typeorm/entities/*[.ts,.js]'],
    cli: {
      migrationsDir: './src/_shared/infra/database/typeorm/migrations',
    },
  },
  {
    name: 'test',
    type: connectionOptions.DEV_HELPER_TEST_DB_TYPE,
    host: connectionOptions.DEV_HELPER_TEST_DB_HOST,
    port: connectionOptions.DEV_HELPER_TEST_DB_PORT,
    username: connectionOptions.DEV_HELPER_TEST_DB_USERNAME,
    password: connectionOptions.DEV_HELPER_TEST_DB_PASSWORD,
    database: connectionOptions.DEV_HELPER_TEST_DB_DATABASE,
    logging: connectionOptions.DEV_HELPER_TEST_DB_LOGGING,
    migrations: ['./src/_shared/infra/database/typeorm/migrations/*[.ts,.js]'],
    entities: ['./src/_shared/infra/database/typeorm/entities/*[.ts,.js]'],
    cli: {
      migrationsDir: './src/_shared/infra/database/typeorm/migrations',
    },
  },
  {
    name: 'production',
    type: connectionOptions.DEV_HELPER_DB_TYPE,
    host: connectionOptions.DEV_HELPER_DB_HOST,
    port: connectionOptions.DEV_HELPER_DB_PORT,
    username: connectionOptions.DEV_HELPER_DB_USERNAME,
    password: connectionOptions.DEV_HELPER_DB_PASSWORD,
    database: connectionOptions.DEV_HELPER_DB_DATABASE,
    logging: connectionOptions.DEV_HELPER_DB_LOGGING,
    migrations: ['./src/_shared/infra/database/typeorm/migrations/*[.ts,.js]'],
    entities: ['./src/_shared/infra/database/typeorm/entities/*[.ts,.js]'],
    cli: {
      migrationsDir: './src/_shared/infra/database/typeorm/migrations',
    },
  },
];