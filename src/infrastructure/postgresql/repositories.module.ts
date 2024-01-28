import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import entities from './entities';
import { SnakeNamingStrategy } from './datasource/naming.strategy';
import {
  I_USER_REPOSITORY,
  UserRepository,
} from './repositories/user.repository';
import {
  I_POST_REPOSITORY,
  PostRepository,
} from './repositories/post.repository';

@Global()
@Module({})
export class RepositoriesModule {
  static forRoot(options: PostgresConnectionCredentialsOptions): DynamicModule {
    return {
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            database: options.database,
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            synchronize: false, // not recommended on production
            logging: true,
            entities: entities,
            autoLoadEntities: false,
            namingStrategy: new SnakeNamingStrategy(),
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            migrationsRun: false,
            migrationsTransactionMode: 'each',
            migrationsTableName: 'migrations_table',
          }),
        }),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [
        {
          provide: I_USER_REPOSITORY,
          useClass: UserRepository,
        },
        {
          provide: I_POST_REPOSITORY,
          useClass: PostRepository,
        },
      ],
      exports: [I_USER_REPOSITORY, I_POST_REPOSITORY],
      module: RepositoriesModule,
    };
  }
}
