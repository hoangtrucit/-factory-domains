import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ModuleMetadata,
  ValidationPipe,
} from '@nestjs/common';

export const sleep = (seconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds);
  });

export const setupE2E = async (
  imports: ModuleMetadata['imports'] = [],
  controllers: ModuleMetadata['controllers'] = [],
  providers: ModuleMetadata['providers'] = [],
): Promise<{ moduleRef: TestingModule; appInstance: INestApplication }> => {
  const moduleRef = await Test.createTestingModule({
    imports,
    controllers,
    providers,
  }).compile();

  const appInstance = moduleRef.createNestApplication();

  appInstance.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { exposeDefaultValues: true },
    }),
  );

  return { moduleRef, appInstance };
};
