import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum GlossaryType {
  PATIENTSTATUS = 'PATIENTSTATUS',
  ENTRYPOINT = 'ENTRYPOINT',
  PATHWAY = 'PATHWAY',
}

registerEnumType(GlossaryType, {
  name: 'GlossaryType',
  description: 'The supported colors.',
  valuesMap: {
    PATIENTSTATUS: {
      description: 'Glossary types belongs to the PATIENT STATUS',
    },
    ENTRYPOINT: {
      description: 'Glossary types belongs to the ENTRY POINT',
    },
    PATHWAY: {
      description: 'Glossary types belongs to the PATHWAY.',
    },
  },
});

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
