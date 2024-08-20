import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {initSwagger} from './swagger'
import { NestExpressApplication } from '@nestjs/platform-express';
// Middleware để làm sạch dữ liệu
import * as express from 'express';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const imagesPath = path.join(__dirname, '../../', 'public/images');

  // Sử dụng middleware Express để phục vụ các file tĩnh trong thư mục public/images
  app.use('/images', express.static(imagesPath));
  initSwagger(app);
  // app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
