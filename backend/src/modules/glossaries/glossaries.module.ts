import { Module } from '@nestjs/common';
import { GlossariesResolver } from './glossaries.resolver';
import { GlossariesController } from './glossaries.controller';
import { GlossariesService } from './glossaries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glossary } from './glossary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Glossary])],
  providers: [GlossariesResolver, GlossariesService],
  controllers: [GlossariesController],
  exports: [GlossariesService],
})
export class GlossariesModule {}
