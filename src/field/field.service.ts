import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { CustomRequest } from 'src/request/custom-request';
import { UsersService } from '../users/users.service';
import { Role } from '../role/role.enum';


@Injectable()
export class FieldService {
  constructor(
    private readonly userService : UsersService,
  ) {}

  create(createFieldDto: CreateFieldDto) {
    return 'This action adds a new field';
  }

  findAll() {
    return `This action returns all field`;
  }

  findOne(id: number) {
    return `This action returns a #${id} field`;
  }

  update(id: number, updateFieldDto: UpdateFieldDto) {
    return `This action updates a #${id} field`;
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }

  async updateField(id: number, updateFieldDto: UpdateFieldDto, req : CustomRequest){
    const user = await this.userService.getUserById(req.user.id);
    if(user.role == Role.Admin){

    }else{
      throw new UnauthorizedException({
        message: 'Vous n\' avez pas les droits necessaires pour faire cette action.',
      });
    }
  }
  
}
