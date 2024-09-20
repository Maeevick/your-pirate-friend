import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username can only contain letters and numbers',
  })
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}

export class SignInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class SignOutDto {
  @IsString()
  token: string;
}
