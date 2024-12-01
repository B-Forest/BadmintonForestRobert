import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { UsersModule } from '../users/users.module';
import { Field } from './entities/field.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [UsersModule,
    TypeOrmModule.forFeature([Field]),
  ],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
