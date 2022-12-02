import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class CreateGlossaryUserTypeSettingDto {
  @IsString()
  @Field()
  entryPoint: string;

  @IsString()
  @Field()
  initialState: string;

  @IsBoolean()
  @Field()
  skipHST: boolean;

  @IsBoolean()
  @Field()
  isFollowupAllowed: boolean;

  @IsString()
  @Field()
  service: string;

  @IsString()
  @Field()
  serviceDefinition: string;
}
