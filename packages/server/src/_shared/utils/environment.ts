import * as dotenv from 'dotenv';
import { join } from 'path';

const path = join(__dirname, '..', '..', '..', '..', '..', '.env');

dotenv.config({
  path,
});

export const {
  DEV_HELPER_DB_TYPE,
  DEV_HELPER_DB_DATABASE,
  DEV_HELPER_DB_CLIENT,
  DEV_HELPER_DB_HOST,
  DEV_HELPER_DB_PORT,
  DEV_HELPER_DB_PASSWORD,
  DEV_HELPER_DB_USERNAME,
  DEV_HELPER_DB_LOGGING,
} = process.env;

export const {
  DEV_HELPER_TEST_DB_TYPE,
  DEV_HELPER_TEST_DB_DATABASE,
  DEV_HELPER_TEST_DB_CLIENT,
  DEV_HELPER_TEST_DB_HOST,
  DEV_HELPER_TEST_DB_PORT,
  DEV_HELPER_TEST_DB_PASSWORD,
  DEV_HELPER_TEST_DB_USERNAME,
  DEV_HELPER_TEST_DB_LOGGING,
} = process.env;
