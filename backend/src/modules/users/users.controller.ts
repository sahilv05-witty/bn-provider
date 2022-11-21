import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Provider } from '../providers/provider.entity';
import { ProvidersService } from '../providers/providers.service';
import { RolesService } from '../roles/roles.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { ActiveUserDto } from './dtos/active-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

// Replace this with the GraphQL Resolver
@Controller('/auth')
// @Serialize(UserDto)
// Use this serialize either at the class level or method depends on the requirement
export class UsersController {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private providersService: ProvidersService,
  ) {}

  @Post('signup')
  async createUser(
    @Body() body: CreateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    const role = await this.rolesService.findOne(body.roleId);

    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    const provider = await this.providersService.findOne(body.providerId);

    if (!provider || role.code !== 'provider') {
      throw new NotFoundException('Provider not found.');
    }

    const user = await this.usersService.create(body, role, currentUser);

    await this.providersService.linkUserAccountToProvider(
      provider.id,
      user,
      currentUser,
    );

    return user;
  }

  @Get('users')
  @Serialize(UserDto)
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Patch('/:id/active')
  activateUser(@Param('/:id') id: string, @Body() body: ActiveUserDto) {
    return this.usersService.activateUserAccount(parseInt(id), body);
  }

  @Post()
  validateUser() {}

  @Post()
  changeUserActiveStatus() {}

  @Post()
  updateUser() {}

  @Delete('/:id')
  async removeUser(@Param('id') id: string, @CurrentUser() currentUser: User) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const providersPromise: Promise<Provider>[] = [];
    user.providers &&
      user.providers.forEach((provider) => {
        providersPromise.push(
          this.providersService.deLinkUserAccountToProvider(
            provider.id,
            currentUser,
          ),
        );
      });

    if (providersPromise.length > 0) {
      console.log('Log before making provider user null');
      await Promise.all(providersPromise);
    }

    return this.usersService.remove(user);
  }
}
