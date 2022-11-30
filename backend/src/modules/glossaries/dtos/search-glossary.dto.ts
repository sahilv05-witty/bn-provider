import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GlossaryType } from './glossary-type.dto';

@InputType()
export class SearchGlossaryDto {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  code?: string;

  @IsEnum(GlossaryType)
  @Field()
  @IsOptional()
  @Field((type) => GlossaryType, { nullable: true })
  type?: GlossaryType;
}
