import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { UsersModule } from 'src/users/users.module';
import { Slot } from '../slot/entities/slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Field, Slot]),
    UsersModule,
  ],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule { }
