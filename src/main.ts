import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as YAML from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Charger le fichier YAML
  const openAPIDocument = YAML.parse(fs.readFileSync('./OAD.yaml', 'utf8'));

  SwaggerModule.setup('api', app, openAPIDocument);

  /* const config = new DocumentBuilder()
    .setTitle('Viati API')
    .setDescription('The Viati API description')
    .setVersion('1.0')
    .addTag('Viati')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); */

  await app.listen(3000);
}
bootstrap();
