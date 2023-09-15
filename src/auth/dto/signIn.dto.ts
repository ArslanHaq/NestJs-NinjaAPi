import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
