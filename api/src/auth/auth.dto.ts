import { IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'john_doe', description: 'Your username' })
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username can only contain letters and numbers',
  })
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Your email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Your password',
  })
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}

export class SignInDto {
  @ApiProperty({ example: 'john_doe', description: 'Your username' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Your password',
  })
  @IsString()
  password: string;
}

export class SignUpInResponseDto {
  @ApiProperty({ example: 'Authentication successful' })
  message: string;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;

  @ApiProperty({
    example: {
      username: 'john_doe',
      email: 'john@example.com',
    },
  })
  user: {
    username: string;
    email: string;
  };
}

export class SignOutDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Your current JWT token',
  })
  @IsString()
  token: string;
}

export class SignOutResponseDto {
  @ApiProperty({ example: 'Successfully signed out' })
  message: string;

  @ApiProperty({ example: true })
  success: boolean;
}
