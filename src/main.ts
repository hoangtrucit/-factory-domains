import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { exposeDefaultValues: true },
    }),
  );

  await app.listen(process.env.PORT, '0.0.0.0').then(() => {
    console.log(
      `start ${process.env.SERVICE_NAME} at port ${process.env.PORT}`,
    );
  });
}

bootstrap();
