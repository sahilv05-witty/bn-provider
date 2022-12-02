import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class GlossaryPatientStatusDto {
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
  @Field({ nullable: true })
  beId?: number;

  @Expose()
  @Field({ nullable: true })
  beState?: string;

  @Expose()
  @Field()
  description: string;

  @Expose()
  @Field()
  pathway: string;

  @Expose()
  @Field()
  patientStatus: string;

  @Expose()
  @Field()
  patientStatusDefinition: string;
}
