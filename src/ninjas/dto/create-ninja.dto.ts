import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;
  id: number;
  @IsEnum(['Kunai', 'nunchuks'], {
    message: 'Weapon must be either Kunai or nunchuks',
  })
  weapon: string;
  belt?: string;
}
