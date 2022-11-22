import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { UserDto } from 'src/modules/users/dtos/user.dto';

@ObjectType()
export class ProviderDto {
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
  name: string;

  @Expose()
  @Field()
  group: string;

  @Expose()
  @Field()
  isActive: boolean;

  @Expose()
  @Field((type) => UserDto, { nullable: true })
  user?: UserDto;
}
