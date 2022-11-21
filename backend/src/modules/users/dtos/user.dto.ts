import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';
import { ProviderDto } from 'src/modules/providers/dtos/provider.dto';
import { RoleDto } from 'src/modules/roles/dtos/role.dto';

/**
 * User Dto contains the properties which can be shared with the client when user details should be shared.
 */
@ObjectType()
export class UserDto {
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
  updatedBy?: string;

  @Expose()
  @Field({ nullable: true })
  updatedAt?: Date;

  @Expose()
  @Field()
  firstName: string;

  @Expose()
  @Field()
  lastName: string;

  @Expose()
  @Field()
  email: string;

  @Expose()
  @Field()
  isActive: boolean;

  @Expose()
  @Field({ nullable: true })
  termsAcceptedAt?: Date;

  @Expose()
  @Field({ nullable: true })
  lastLoggedInAt?: Date;

  @Expose()
  @Field({ nullable: true })
  @Transform(({ obj }) => obj.role?.id)
  roleId: number;

  @Expose()
  @Field((type) => RoleDto, { nullable: true })
  @Transform(({ obj }) => obj.role)
  role: RoleDto;

  @Expose()
  @Field((type) => [ProviderDto], { nullable: true })
  providers: ProviderDto[];
}
