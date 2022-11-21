import { IsNumber } from 'class-validator';

/**
 * ActiveUserDto used with the create method POST endpoint to capture the input.
 */
export class UpdateUserRoleDto {
  @IsNumber()
  roleId: number;
}
