import { IsNumber } from 'class-validator';

export class UpdateProviderUserDto {
  @IsNumber()
  userId: number;
}
