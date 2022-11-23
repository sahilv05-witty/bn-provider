import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @Field()
  roleId: number;

  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  providerId?: number;
}
