import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { UpdateProviderUserDto } from './dtos/update-provider-user.dto';
import { ProvidersService } from './providers.service';

@Controller('providers')
export class ProvidersController {
  constructor(private providersService: ProvidersService) {}

  @Post()
  createProvider(@Body() body: CreateProviderDto, @CurrentUser() user: User) {
    return this.providersService.create(body, user);
  }

  @Get()
  getAllProviders() {
    return this.providersService.findAll();
  }
}
