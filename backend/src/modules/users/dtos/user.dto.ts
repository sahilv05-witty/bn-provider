import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
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
  @Field({ nullable: true })
  lastName?: string;

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
  @Field((type) => RoleDto)
  @Transform(({ obj }) => obj.role)
  role: RoleDto;

  @Expose()
  @Field((type) => ProviderDto, { nullable: true })
  @Transform(({ obj }) => obj.provider)
  provider?: ProviderDto;

  @Expose()
  @Field()
  isProvider: boolean;
}
