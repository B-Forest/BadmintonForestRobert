import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './src/users/entities/user.entity';
import { UsersSeeder } from './src/users/users.seeder';
import { ConfigModule } from '@nestjs/config';

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
            autoLoadEntities: true,
            synchronize: false,
            entities: [User]
        }),
        TypeOrmModule.forFeature([User]), // Importer l'entité User
    ],
}).run([UsersSeeder]); // Exécuter le seeder pour peupler les données
