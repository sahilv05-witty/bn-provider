import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

@InputType()
export class UpdateReferenceDto {
  @IsNumber()
  @Field()
  id: number;

  @IsString()
  @IsOptional()
  @Field()
  code?: string;

  @IsString()
  @IsOptional()
  @Field()
  name?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  isActive?: boolean;
}
