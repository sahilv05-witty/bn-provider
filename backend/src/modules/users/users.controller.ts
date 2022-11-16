import { Controller, Post, Body } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

// Replace this with the GraphQL Resolver
@Controller('auth')
@Serialize(User) // Use this serialize either at the class level or method depends on the requirement
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email);
  }

  @Post()
  validateUser() {}

  @Post()
  changeUserActiveStatus() {}

  @Post()
  updateUser() {}
}
