import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { UserDto } from './user.dto';

@ObjectType()
export class CreateUserResponeDto {
  @Expose()
  @Field()
  activationToken: string;

  @Expose()
  @Field((type) => UserDto)
  user: UserDto;
}
