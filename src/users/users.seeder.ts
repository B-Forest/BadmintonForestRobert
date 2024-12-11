import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Role } from '../role/role.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersSeeder implements Seeder {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async seed(): Promise<any> {
        const users = [{ pseudo: 'A', password: 'admin' }, { pseudo: 'B', password: 'password' }, { pseudo: 'C', password: 'root' }, { pseudo: 'admybad', password: 'astrongpassword', role: Role.Admin }];
        return this.userRepository.save(users);
    }

    async drop(): Promise<any> {
        return this.userRepository.clear();
    }
}