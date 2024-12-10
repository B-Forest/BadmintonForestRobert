import { Seeder, DataFactory } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';



export class FieldSeeder implements Seeder {
    constructor(
        @InjectRepository(Field)
        private readonly fieldRepository: Repository<Field>,
    ) { }

    async seed(): Promise<any> {
        const fields = [
            {
                field_name: 'A',
                next_avaible_day: new Date(),
            },
            {
                field_name: 'B',
                next_avaible_day: new Date(),
            },
            {
                field_name: 'C',
                next_avaible_day: new Date(),
            },
            {
                field_name: 'D',
                next_avaible_day: new Date(),
            },

        ]
        return this.fieldRepository.save(fields); // Sauvegarde les utilisateurs dans la base de données
    }

    async drop(): Promise<any> {
        return this.fieldRepository.clear(); // Efface tous les utilisateurs de la base de données
    }
}