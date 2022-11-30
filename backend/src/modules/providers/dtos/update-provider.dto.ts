import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateProviderDto {
  @IsNumber()
  @Field()
  id: number;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  group: string;

  @IsNumber()
  @Field()
  brighttreeId: number;
}
