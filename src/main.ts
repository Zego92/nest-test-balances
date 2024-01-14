// Core
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';

// Config
import { createLogger, swaggerConfig } from '@/config';

// Modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    logger: createLogger(),
  });
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.setGlobalPrefix('api');
  app.enableCors();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}

bootstrap();
