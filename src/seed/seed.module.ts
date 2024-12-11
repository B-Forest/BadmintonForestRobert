import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSeeder } from '../users/users.seeder'; // Assurez-vous que le chemin du seeder est correct
import { UserEntity } from 'src/users/entities/user.entity';
import { FieldEntity } from 'src/field/entities/field.entity';
import { FieldSeeder } from 'src/field/field.seeder';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, FieldEntity]), // Ajout des entités User et Field
    ],
    providers: [UsersSeeder, FieldSeeder], // Ajout des Seeders UsersSeeder et FieldSeeder
})
export class SeedModule { }