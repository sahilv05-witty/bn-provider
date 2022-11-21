import { IsEmail, IsNumber, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

/**
 * CreateUserDto used with the create method POST endpoint to capture the input.
 */
export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  roleId: number;

  @IsNumber()
  providerId?: number;

  // Similarly add other properties required to create an user account.
}
