import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // faqat DTOdagi maydonlarni qabul qiladi
      forbidNonWhitelisted: true, // kerakmagan maydonlar bo‘lsa xatolik chiqaradi
      transform: true, // avtomatik type konvertatsiyasi
    }),
  );

  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle('Online Course API')
    .setDescription('Online kurs platformasining API hujjati')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
