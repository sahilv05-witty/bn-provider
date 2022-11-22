import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';

export enum ReferenceType {
  PATIENTSTATUS = 'PATIENTSTATUS',
  ENTRYPOINT = 'ENTRYPOINT',
  PATHWAY = 'PATHWAY',
}

registerEnumType(ReferenceType, {
  name: 'ReferenceType',
  description: 'The supported colors.',
  valuesMap: {
    PATIENTSTATUS: {
      description: 'Reference types belongs to the PATIENT STATUS',
    },
    ENTRYPOINT: {
      deprecationReason: 'Reference types belongs to the ENTRY POINT',
    },
    PATHWAY: {
      deprecationReason: 'Reference types belongs to the PATHWAY.',
    },
  },
});

@InputType()
export class CreateReferenceDto {
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

  @IsEnum(ReferenceType)
  @Field()
  @Field((type) => ReferenceType)
  type: ReferenceType;
}
