import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSeeder } from '../users/users.seeder';
import { UserEntity } from 'src/users/entities/user.entity';
import { FieldEntity } from 'src/field/entities/field.entity';
import { FieldSeeder } from 'src/field/field.seeder';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, FieldEntity]),
    ],
    providers: [UsersSeeder, FieldSeeder],
})
export class SeedModule { }