import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SelfLink } from 'nest-hal';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.userRegister(createUserDto);
    return {
      ...result,
      _links: {
        self: { href: '/register' },
        connection: { href: '/login' },
      },
    };
  }

  @Post('/login')
  async login(@Body() body: CreateUserDto) {
    const token = await this.usersService.login(body);
    return {
      token,
      _links: {
        self : { href: '/login' },
        reservations: { href: '/slots/reservations/{id}', method: 'POST'},
        mesReservations: { href: '/slots/users/reservations'},
      },
    }
  }


}
