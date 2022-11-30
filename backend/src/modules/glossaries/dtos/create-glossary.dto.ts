import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GlossaryType } from './glossary-type.dto';

@InputType()
export class CreateGlossaryDto {
  @IsString()
  @Field()
  code: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsEnum(GlossaryType)
  @Field()
  @Field((type) => GlossaryType)
  type: GlossaryType;
}
