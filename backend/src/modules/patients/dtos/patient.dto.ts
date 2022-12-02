import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';
import { GlossaryDto } from 'src/modules/glossaries/dtos/glossary.dto';
import { ProviderDto } from 'src/modules/providers/dtos/provider.dto';

@ObjectType()
export class PatientDto {
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
  dateOfBirth: Date;

  @Expose()
  @Field()
  brighttreeNumber: Number;

  @Expose()
  @Field()
  betterNightId: Number;

  @Expose()
  @Field()
  entryPoint: string;

  @Expose()
  @Field()
  pathway: string;

  @Expose()
  @Field()
  state: string;

  @Expose()
  @Field()
  skipHST: boolean;

  @Expose()
  @Field()
  isFollowupAllowed: boolean;

  @Expose()
  @Field()
  @Transform(({ obj }) => obj.service?.service)
  service: string;

  @Expose()
  @Field()
  @Transform(({ obj }) => obj.status?.patientStatus)
  status: string;

  @Expose()
  @Field()
  statusDate: Date;

  @Expose()
  @Field()
  @Transform(({ obj }) => obj.provider?.name)
  provider: string;
}
