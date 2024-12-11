import { Module } from '@nestjs/common';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { FieldModule } from 'src/field/field.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotEntity } from './entities/slot.entity';
import { UsersModule } from 'src/users/users.module';
import { SlotsResolver } from './slot.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([SlotEntity]),
    FieldModule,
    UsersModule],
  controllers: [SlotController],
  providers: [SlotService, SlotsResolver],
  exports: [SlotService],
})
export class SlotModule { }
