import { join } from 'path';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

const ENVIRONMENT_BASED_CONNECTION = process.env.NODE_ENV;

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions(
    ENVIRONMENT_BASED_CONNECTION
  );

  const connection = await createConnection(
    Object.assign(
      defaultOptions,
      !defaultOptions
        ? {
            type: 'sqlite',
            database: join(__dirname, '..', 'database.sqlite'),
          }
        : null
    )
  );

  if (connection.isConnected) {
    console.log(connection.logger);
  }

  return connection;
};
