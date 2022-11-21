import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

/**
 * ActiveUserDto used with the create method POST endpoint to capture the input.
 */
export class ActiveUserDto {
  @IsString()
  password: string;
}
