import { Seeder, DataFactory } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


export class UsersSeeder implements Seeder {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async seed(): Promise<any> {
        const users = [{pseudo : 'A', password : 'admin'}, {pseudo : 'B', password : 'password'}, {pseudo : 'C', password : 'root'}]; // Génère 10 utilisateurs fictifs
        return this.userRepository.save(users); // Sauvegarde les utilisateurs dans la base de données
    }

    async drop(): Promise<any> {
        return this.userRepository.clear(); // Efface tous les utilisateurs de la base de données
    }
}