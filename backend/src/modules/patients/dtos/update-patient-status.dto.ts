import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';

@InputType()
export class UpdatePatientDto {
  // Use Brighttree Number or Better Night Id as per the requirement
  @IsNumber()
  @Field()
  id: number;

  @IsNumber()
  @Field()
  statusId: number;

  @IsDate()
  @Field()
  statusDate: Date;
}
