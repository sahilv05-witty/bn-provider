import { Module } from '@nestjs/common';
import { UserStateGlossariesResolver } from './user-state-glossaries.resolver';
import { UserStateGlossariesController } from './user-state-glossaries.controller';
import { UserStateGlossariesService } from './user-state-glossaries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStateGlossary } from './user-state-glossary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStateGlossary])],
  providers: [UserStateGlossariesResolver, UserStateGlossariesService],
  controllers: [UserStateGlossariesController],
})
export class UserStateGlossariesModule {}
