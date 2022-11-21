import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Provider } from './provider.entity';
import { ProvidersController } from './providers.controller';
import { ProvidersResolver } from './providers.resolver';
import { ProvidersService } from './providers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService, ProvidersResolver],
  exports: [ProvidersService],
})
export class ProvidersModule {}
