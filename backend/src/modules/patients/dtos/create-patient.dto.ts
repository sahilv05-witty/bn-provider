import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePatientDto {
  @IsString()
  @Field()
  firstName: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  lastName?: string;

  @IsDate()
  @Field()
  dateOfBirth: Date;

  @IsNumber()
  @Field()
  brighttreeNumber: number;

  @IsNumber()
  @Field()
  betterNightId: number;

  @IsNumber()
  @Field()
  entryPointId: number;

  @IsNumber()
  @Field()
  currentPathwayId: number;

  @IsNumber()
  @Field()
  statusId: number;

  @IsDate()
  @Field()
  statusDate: Date;

  @IsNumber()
  @Field()
  providerId: number;
}
