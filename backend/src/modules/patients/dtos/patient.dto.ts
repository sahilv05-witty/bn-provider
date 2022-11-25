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
  @Transform(({ obj }) => obj.entryPoint?.name)
  entryPoint: string;

  @Expose()
  @Field()
  @Transform(({ obj }) => obj.currentPathway?.name)
  currentPathway: string;

  @Expose()
  @Field()
  @Transform(({ obj }) => obj.status?.name)
  status: string;

  @Expose()
  @Field()
  statusDate: Date;

  @Expose()
  @Field()
  @Transform(({ obj }) => obj.provider?.name)
  provider: string;
}
