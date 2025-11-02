import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './infrastructure/config/app.config';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './infrastructure/logging/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerConfig),
  });
  const configService = app.get(AppConfigService);

  app.setGlobalPrefix(`api/${configService.getApiVersion()}`);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: configService.getCorsOrigin() || '*',
    credentials: true,
  });

  const port = configService.getPort();
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api/${configService.getApiVersion()}`);
}

bootstrap();

