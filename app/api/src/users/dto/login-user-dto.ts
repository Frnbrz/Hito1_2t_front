import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  username: string;

  @MinLength(3)
  @MaxLength(10)
  password: string;
}
