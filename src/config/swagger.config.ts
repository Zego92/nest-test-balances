// Core
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Nest OpenAPI')
  .setVersion('1.0')
  .addTag('API')
  .addBearerAuth({
    type: 'apiKey',
  })
  .build();
