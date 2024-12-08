import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Field]), // Enregistrer l'entité Field comme dépôt
  ],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule { }
