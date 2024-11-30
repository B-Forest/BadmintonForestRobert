import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSeeder } from '../users/users.seeder'; // Assurez-vous que le chemin du seeder est correct
import { User } from 'src/users/entities/user.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Importation de l'entité User
    ],
    providers: [UsersSeeder], // Ajoutez uniquement le seeder dans les providers
})
export class SeedModule { }