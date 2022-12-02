import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class GlossaryUserTypeSettingDto {
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
  entryPoint: string;

  @Expose()
  @Field()
  initialState: string;

  @Expose()
  @Field()
  skipHST: boolean;

  @Expose()
  @Field()
  isFollowupAllowed: boolean;

  @Expose()
  @Field()
  service: string;

  @Expose()
  @Field()
  serviceDefinition: string;
}
