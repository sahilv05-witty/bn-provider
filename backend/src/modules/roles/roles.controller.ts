import { Controller, Post, Body, Get } from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRole(@Body() body: CreateRoleDto, @CurrentUser() user: User) {
    return this.rolesService.create(body, user);
  }

  @Get()
  getAllRoles() {
    return this.rolesService.findAll();
  }
}
