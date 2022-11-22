import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class SearchUserDto {
  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  roleId?: number;
}
