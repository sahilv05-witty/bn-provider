import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class SearchProviderDto {
  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  isActive?: boolean;
}
