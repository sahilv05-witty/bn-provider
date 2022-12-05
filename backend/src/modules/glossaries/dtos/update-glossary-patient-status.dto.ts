import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { DataSourceType } from '../enums/data-source-type.enum';

@InputType()
export class UpdateGlossaryPatientStatusDto {
  @IsNumber()
  @Field()
  id: number;

  @IsString()
  @Field()
  patientStatus: string;

  @IsString()
  @Field()
  patientStatusDefinition: string;
}
