import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appPort } from './env/envoriment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('Tecnologias: Nestjs, Swagger, TypeOrm, Sqlite e Docker')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(appPort, () => {
    console.log(`Application running on port http://localhost:${appPort}/api`);
  });
}
bootstrap();
