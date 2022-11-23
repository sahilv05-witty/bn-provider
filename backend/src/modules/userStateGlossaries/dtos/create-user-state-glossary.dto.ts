import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum UserStateGlossaryType {
  PATIENTSTATUS = 'PATIENTSTATUS',
  ENTRYPOINT = 'ENTRYPOINT',
  PATHWAY = 'PATHWAY',
}

registerEnumType(UserStateGlossaryType, {
  name: 'UserStateGlossaryType',
  description: 'The supported colors.',
  valuesMap: {
    PATIENTSTATUS: {
      description: 'UserStateGlossary types belongs to the PATIENT STATUS',
    },
    ENTRYPOINT: {
      deprecationReason: 'UserStateGlossary types belongs to the ENTRY POINT',
    },
    PATHWAY: {
      deprecationReason: 'UserStateGlossary types belongs to the PATHWAY.',
    },
  },
});

@InputType()
export class CreateUserStateGlossaryDto {
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

  @IsEnum(UserStateGlossaryType)
  @Field()
  @Field((type) => UserStateGlossaryType)
  type: UserStateGlossaryType;
}
