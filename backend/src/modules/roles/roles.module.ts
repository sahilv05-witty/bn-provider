import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesResolver } from './roles.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => UsersModule)],
  providers: [RolesService, RolesResolver],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
