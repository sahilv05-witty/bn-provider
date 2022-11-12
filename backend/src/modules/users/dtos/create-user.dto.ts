import { IsEmail } from 'class-validator';

/**
 * CreateUserDto used with the create method POST endpoint to capture the input.
 */
export class CreateUserDto {
  @IsEmail()
  email: number;

  // Similarly add other properties required to create an user account.
}
