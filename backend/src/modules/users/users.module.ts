import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersModule } from '../providers/providers.module';
import { RolesModule } from '../roles/roles.module';

import { UsersController } from './users.controller';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

import { User } from './user.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

const configService = new ConfigService();
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: '3600s' },
    }),
    forwardRef(() => RolesModule),
    forwardRef(() => ProvidersModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver, LocalStrategy, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
