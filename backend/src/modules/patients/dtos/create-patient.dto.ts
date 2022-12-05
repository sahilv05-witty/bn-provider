import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsString()
  @Field()
  entryPoint: string;

  @IsString()
  @Field()
  pathway: string;

  @IsString()
  @Field()
  state: string;

  @IsBoolean()
  @Field()
  skipHST: boolean;

  @IsBoolean()
  @Field()
  isFollowupAllowed: boolean;

  @IsNumber()
  @Field()
  serviceId: number;

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
