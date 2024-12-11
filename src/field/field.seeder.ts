import { Seeder, DataFactory } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldEntity } from './entities/field.entity';
import { Injectable } from '@nestjs/common';


@Injectable()
export class FieldSeeder implements Seeder {
    constructor(
        @InjectRepository(FieldEntity)
        private readonly fieldRepository: Repository<FieldEntity>,
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
        return this.fieldRepository.save(fields);
    }

    async drop(): Promise<any> {
        return this.fieldRepository.clear();
    }
}