import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { DataSourceType } from '../enums/data-source-type.enum';

@InputType()
export class CreateGlossaryPatientStatusDto {
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  beId: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  beState: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsEnum(DataSourceType)
  @Field()
  dataSource: DataSourceType;

  @IsString()
  @Field()
  pathway: string;

  @IsString()
  @Field()
  patientStatus: string;

  @IsString()
  @Field()
  patientStatusDefinition: string;
}
