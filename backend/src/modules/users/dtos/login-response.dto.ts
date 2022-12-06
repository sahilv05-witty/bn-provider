import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@ObjectType()
export class LoginResponeDto {
  @Field()
  accessToken: string;

  @Field(() => UserDto)
  user: UserDto;
}
