import { resolve } from 'path';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

export const startDbContainer = async () => {
  return await new PostgreSqlContainer('postgres:14.1-alpine')
    .withCopyFilesToContainer([
      {
        source: resolve(__dirname, '../../docker/scripts/init.sql'),
        target: '/docker-entrypoint-initdb.d/init.sql',
      },
    ])
    .withExposedPorts(5432)
    .start();
};
