import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './field/entities/field.entity';
import { Slot } from './slot/entities/slot.entity';
import { User } from './users/entities/user.entity';
import { UsersController } from './users/users.controller';
import { SlotController } from './slot/slot.controller';
import { UsersModule } from './users/users.module';
import { FieldModule } from './field/field.module';
import { SlotModule } from './slot/slot.module';

ConfigModule.forRoot();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Field, Slot],
    }),
    UsersModule,
    FieldModule,
    SlotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }