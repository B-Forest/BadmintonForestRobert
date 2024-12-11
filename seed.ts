import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './src/users/entities/user.entity';
import { UsersSeeder } from './src/users/users.seeder';
import { ConfigModule } from '@nestjs/config';
import { FieldEntity } from './src/field/entities/field.entity';
import { FieldSeeder } from './src/field/field.seeder';
import { SlotEntity } from './src/slot/entities/slot.entity';

ConfigModule.forRoot();

seeder({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [UserEntity, FieldEntity, SlotEntity],
        }),
        TypeOrmModule.forFeature([UserEntity, FieldEntity, SlotEntity]),
    ],
}).run([UsersSeeder, FieldSeeder]);
