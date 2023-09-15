import { IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  userId: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
