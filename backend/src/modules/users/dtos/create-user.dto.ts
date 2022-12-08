import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * CreateUserDto used with the create method POST endpoint to capture the input.
 */
@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  firstName: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  lastName?: string;

  @IsEmail()
  @Field()
  email: string;

  @IsNumber()
  @Field(() => Int)
  roleId: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  providerId?: number;

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  useSalutation?: boolean;
}
