import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { SignUpDto, SignInDto, SignOutDto } from './auth.dto';
import { IUserRepository, User } from '../user/user.port';

const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  private createSafeUser({ username, email }: User) {
    return { username, email };
  }

  private signToken({ id, username }: User) {
    return this.jwtService.sign({
      username: username,
      sub: id,
    });
  }

  async signUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const salt = randomBytes(16).toString('hex');
    const hash = (await scryptAsync(password, salt, 64)) as Buffer;
    const hashedPassword = `${salt}:${hash.toString('hex')}`;

    const newUser = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = this.signToken(newUser);

    await this.userRepository.updateToken(newUser.id, token);

    return { user: this.createSafeUser(newUser), token };
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const [salt, storedHash] = user.password.split(':');
    const hash = (await scryptAsync(password, salt, 64)) as Buffer;
    const isPasswordValid = storedHash === hash.toString('hex');

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user);

    await this.userRepository.updateToken(user.id, token);

    return { user, token };
  }

  async signOut(signOutDto: SignOutDto) {
    const user = await this.userRepository.findByToken(signOutDto.token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    await this.userRepository.updateToken(user.id, null);

    return { message: 'Successfully signed out' };
  }
}
