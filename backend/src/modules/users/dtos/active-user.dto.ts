import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

/**
 * ActiveUserDto used with the create method POST endpoint to capture the input.
 */
@InputType()
export class ActiveUserDto {
  @IsNumber()
  @Field()
  id: number;

  @IsString()
  @Field()
  password: string;

  @IsString()
  @Field()
  activationToken: string;
}
