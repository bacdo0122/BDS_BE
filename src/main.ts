import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {initSwagger} from './swagger'
import { NestExpressApplication } from '@nestjs/platform-express';
// Middleware để làm sạch dữ liệu

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initSwagger(app);
  // app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
