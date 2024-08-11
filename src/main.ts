import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // strip undefine properties
      transformOptions: { exposeDefaultValues: true },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT, '0.0.0.0').then(() => {
    console.log(
      `start ${process.env.SERVICE_NAME} at port ${process.env.PORT}`,
    );
  });
}

bootstrap();
