import { Module } from '@nestjs/common';
import { ReferencesResolver } from './references.resolver';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from './reference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reference])],
  providers: [ReferencesResolver, ReferencesService],
  controllers: [ReferencesController],
})
export class ReferencesModule {}
