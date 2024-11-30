import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
) {}

  async userRegister(data: any) {
    return await this.createUser(data);
  }

  async login(data: CreateUserDto) {
    if (!data.password || !data.pseudo) {
      throw new UnauthorizedException({
        message: 'Pseudo and password are required',
      });
    }
    const user = await this.getUserByPseudo(data.pseudo);
    if (user?.password && await bcrypt.compare(data.password, user.password)) {
      const payload = { id: user.id };
      const token = await this.jwtService.signAsync(payload);
      return token;
    } else {
      throw new UnauthorizedException({
        message: 'Invalid pseudo or password',
      });
    }
  }

  getUserByPseudo(pseudo: string) {
    return this.userRepository.findOneBy({ pseudo });
  }

  getUserById(id: number){
    return this.userRepository.findOneBy({ id: id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.password || !createUserDto.pseudo) {
      throw new UnauthorizedException({
        message: 'Pseudo and password are required',
      });
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

}
