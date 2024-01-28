import { Module } from '@nestjs/common';
import { UserModule } from './domains/user/domain.user.module';
import { RepositoriesModule } from './infrastructure/postgresql/repositories.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import rootConfiguration from './infrastructure/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(process.cwd(), 'env', `.env`)],
      load: [rootConfiguration],
    }),
    UserModule,
    RepositoriesModule.forRoot({
      database: rootConfiguration().DB_DATABASE,
      host: rootConfiguration().DB_HOST,
      port: rootConfiguration().DB_PORT,
      username: rootConfiguration().DB_USERNAME,
      password: rootConfiguration().DB_PASSWORD,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
