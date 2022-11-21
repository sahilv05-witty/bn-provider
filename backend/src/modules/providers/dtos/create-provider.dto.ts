import { IsNumber, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  name: string;
  @IsString()
  group: string;
  @IsNumber()
  brighttreeId: number;
}
