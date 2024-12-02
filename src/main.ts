import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appPort } from './env/envoriment';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('Tecnologias: Nestjs, Swagger, TypeOrm, Sqlite e Docker')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(appPort, () => {
    new Logger('main.ts').log(
      `Server running on port http://localhost:${appPort}/api`,
    );
  });
}
bootstrap();
