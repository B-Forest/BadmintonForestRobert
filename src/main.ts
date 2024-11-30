import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as YAML from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Charger le fichier YAML
  const openAPIDocument = YAML.parse(fs.readFileSync('./OAD.yaml', 'utf8'));
  
  SwaggerModule.setup('api', app, openAPIDocument);

  await app.listen(3000);
}
bootstrap();
