import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports : [UsersModule],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
