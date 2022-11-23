import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { UserDto } from 'src/modules/users/dtos/user.dto';

@ObjectType()
export class RoleDto {
  @Expose()
  @Field()
  id: number;

  @Expose()
  @Field()
  createdBy: string;

  @Expose()
  @Field()
  createdAt: Date;

  @Expose()
  @Field({ nullable: true })
  updatedBy: string;

  @Expose()
  @Field({ nullable: true })
  updatedAt: Date;

  @Expose()
  @Field()
  code: string;

  @Expose()
  @Field()
  name: string;

  @Expose()
  @Field({ nullable: true })
  description: string;

  @Expose()
  @Field()
  isActive: boolean;

  @Expose()
  @Field((type) => [UserDto])
  users: UserDto[];
}
