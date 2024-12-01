import { IsOptional } from 'class-validator';
import { Role } from 'src/role/role.enum';

export class CreateUserDto {
  password: string;

  pseudo: string;

  @IsOptional()
  role?: Role;
}
