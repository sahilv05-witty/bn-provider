import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateGlossaryUserTypeSettingDto {
  @IsNumber()
  @Field()
  id: number;

  @IsString()
  @Field()
  service: string;

  @IsString()
  @Field()
  serviceDefinition: string;
}
