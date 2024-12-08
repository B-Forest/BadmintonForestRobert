import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.const';


@Module({
  imports:[TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '61d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
<<<<<<< HEAD
  exports:[UsersService],
=======
  exports: [UsersService],
>>>>>>> f3055d4 (creation of slots)
})
export class UsersModule { }
