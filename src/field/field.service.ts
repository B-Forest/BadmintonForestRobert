import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { CustomRequest } from 'src/request/custom-request';
import { UsersService } from '../users/users.service';
import { Role } from '../role/role.enum';
import { Field } from './entities/field.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    protected readonly fieldRepository: Repository<Field>,
    private readonly userService: UsersService,
  ) { }

  create(createFieldDto: CreateFieldDto) {
    return 'This action adds a new field';
  }

  findAll() {
    return this.fieldRepository.find();
  }

  findOne(id: number): Promise<Field> {
    return this.fieldRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateFieldDto: UpdateFieldDto) {
    return `This action updates a #${id} field`;
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }

  async updateField(field_name: string, req: CustomRequest) {
    const user = await this.userService.getUserById(req.user.id);
    if (user.role == Role.Admin) {
      let field = await this.getFieldByName(field_name);
      let date = new Date(field.next_avaible_day);
      let today = new Date(Date.now());
      if(date >= today){
        date = new Date(today);
      } else {
        date = new Date(today);
        date.setDate(date.getDate() + 2);
      }
      field.next_avaible_day = date;
      return this.fieldRepository.save(field);
    } else {
      throw new UnauthorizedException({
        message: 'Vous n\' avez pas les droits necessaires pour faire cette action.',
      });
    }
  }

  getFieldByName(field_name: string) {
    return this.fieldRepository.findOneBy({ field_name });
  }

}
