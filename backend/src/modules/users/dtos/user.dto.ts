import { Expose } from 'class-transformer';

/**
 * User Dto contains the properties which can be shared with the client when user details should be shared.
 */
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: number;

  // As User password should not be shared to the client.  Don't add here.
}
