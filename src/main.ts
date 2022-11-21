import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger config
  const config = new DocumentBuilder()
    .setTitle('Shop API')
    .setDescription('The Shop BackEnd API documentation')
    .setVersion('1.0')
    .addTag('Listoapp.ir')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Listoapp API Docs',
  };
  SwaggerModule.setup('api-docs', app, document, customOptions);
  //global app config
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // app.enableCors({
  //   origin: 'http://localhost:8080',
  //   credentials: true,
  // });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(8000);
}
bootstrap();
