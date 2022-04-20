import {
  Connection,
  createConnection,
  createConnections,
  getConnectionOptions,
} from 'typeorm';

createConnection();

// export default async (): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions(ENVIRONMENT);

//   const connection = await createConnection(defaultOptions);

//   console.log(connection);

//   return connection;
// };
