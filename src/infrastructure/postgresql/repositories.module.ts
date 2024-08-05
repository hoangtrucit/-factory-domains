import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import entities from './entities';
import { SnakeNamingStrategy } from './datasource/naming.strategy';
import {
  I_ACCOUNT_REPOSITORY,
  AccountRepository,
} from './repositories/account.repository';
import {
  I_POST_REPOSITORY,
  PostRepository,
} from './repositories/post.repository';
import { dataSourceRepository } from './datasource';

@Global()
@Module({})
export class RepositoriesModule {
  static forRoot(options: PostgresConnectionCredentialsOptions): DynamicModule {
    const config: TypeOrmModuleOptions | PostgresConnectionCredentialsOptions =
      {
        type: 'postgres',
        database: options.database,
        host: options.host,
        port: options.port,
        username: options.username,
        password: options.password,
        synchronize: false,
        logging: false,
        entities: entities,
        namingStrategy: new SnakeNamingStrategy(),
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: true,
        migrationsTransactionMode: 'each',
        migrationsTableName: 'migrations_table',
      };

    dataSourceRepository.setOptions(config);

    return {
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            ...config,
            autoLoadEntities: false,
          }),
          dataSourceFactory: async () => {
            return dataSourceRepository.initialize();
          },
        }),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [
        {
          provide: I_ACCOUNT_REPOSITORY,
          useClass: AccountRepository,
        },
        {
          provide: I_POST_REPOSITORY,
          useClass: PostRepository,
        },
      ],
      exports: [I_ACCOUNT_REPOSITORY, I_POST_REPOSITORY],
      module: RepositoriesModule,
    };
  }
}
