import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { FieldModule } from 'src/field/field.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';
import { UsersModule } from 'src/users/users.module';
import { Field } from '../field/entities/field.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Slot, Field]),
    FieldModule,
    UsersModule],
  controllers: [SlotController],
  providers: [SlotService],
  exports: [SlotService],
})
export class SlotModule { }
