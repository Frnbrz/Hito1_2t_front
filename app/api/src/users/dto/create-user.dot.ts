import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username: string;

  @MinLength(3)
  @MaxLength(10)
  password: string;

  @Transform(({ value }) => value.toLowerCase() as string)
  @IsEmail()
  email: string;
}
