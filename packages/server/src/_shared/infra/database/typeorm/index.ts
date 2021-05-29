import { Connection, createConnection, getConnectionOptions } from 'typeorm';

const ENVIRONMENT = process.env.NODE_ENV;

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions(ENVIRONMENT);

  const connection = await createConnection(defaultOptions);

  console.log(connection.logger);

  return connection;
};
