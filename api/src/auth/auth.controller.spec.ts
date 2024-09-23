import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { drizzleProvider } from '../drizzle/drizzle.provider';
import { UserRepository } from '../user/user.repository';

const setupExistingUser = async (
  userRepository: UserRepository,
  token?: string,
) => {
  const fakeExistingUserData = {
    username: 'john_doe',
    email: 'john@example.com',
    password:
      '411347f5afdc5d9e7a18dd18f4499957:e205ffc68cc466883fbf6f002042013296307af4485c4ba3f36cbdf183112687b15e9c0e54e9080c2dd466153aca2311dd59834d32d6f9be464f409da6353537',
    token: token ?? null,
  };
  await userRepository.create(fakeExistingUserData);
};

const revertUserByUsername = async (userRepository: UserRepository) => {
  const user = await userRepository.findByUsername('john_doe');
  if (user) {
    userRepository.delete(user!.id);
  }
};

describe('AuthController', () => {
  let authController: AuthController;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
          inject: [ConfigService],
          global: true,
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        drizzleProvider,
        UserRepository,
        {
          provide: 'USER_REPOSITORY',
          useClass: UserRepository,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    userRepository = app.get<UserRepository>(UserRepository);
  });

  afterEach(async () => {
    await revertUserByUsername(userRepository);
  });

  describe('signup', () => {
    describe('with valid data', () => {
      it('returns the safe user data and the token', async () => {
        const fakeSignUpData = {
          username: 'john_doe',
          email: 'john@example.com',
          password: 'StrongP@ssw0rd',
        };
        const expectedResult = {
          user: {
            username: 'john_doe',
            email: 'john@example.com',
          },
          token: 'any random string',
        };
        const result = await authController.signUp(fakeSignUpData);

        expect(result.user).toStrictEqual(expectedResult.user);
        expect(result.token).toBeDefined();
      });
    });

    describe('with existing username', () => {
      it('throws an error "Username already exists"', async () => {
        await setupExistingUser(userRepository);

        const fakeSignUpData = {
          username: 'john_doe',
          email: 'doe@example.com',
          password: 'StrongP@ssw0rd',
        };

        await expect(authController.signUp(fakeSignUpData)).rejects.toThrow(
          new ConflictException('Username already exists'),
        );
      });
    });
  });

  describe('signin', () => {
    describe('with valid data', () => {
      it('returns the safe user data and the token', async () => {
        await setupExistingUser(userRepository);

        const fakeSignInData = {
          username: 'john_doe',
          password: 'StrongP@ssw0rd',
        };
        const expectedResult = {
          user: {
            username: 'john_doe',
            email: 'john@example.com',
          },
          token: 'any random string',
        };
        const result = await authController.signIn(fakeSignInData);

        expect(result.user).toStrictEqual(expectedResult.user);
        expect(result.token).toBeDefined();
      });
    });

    describe('with unknown username', () => {
      it('throws an error "Invalid credentials"', async () => {
        await setupExistingUser(userRepository);

        const fakeSignInData = {
          username: 'unknown',
          password: 'StrongP@ssw0rd',
        };

        await expect(authController.signIn(fakeSignInData)).rejects.toThrow(
          new UnauthorizedException('Invalid credentials'),
        );
      });
    });

    describe('with invalid password', () => {
      it('throws an error "Invalid credentials"', async () => {
        await setupExistingUser(userRepository);

        const fakeSignInData = {
          username: 'john_doe',
          password: 'invalid',
        };

        await expect(authController.signIn(fakeSignInData)).rejects.toThrow(
          new UnauthorizedException('Invalid credentials'),
        );
      });
    });
  });

  describe('signout', () => {
    describe('with valid token', () => {
      it('returns success message and delete token', async () => {
        await setupExistingUser(userRepository, 'some-token');

        const fakeSignOutData = {
          token: 'some-token',
        };
        const expectedResult = { message: 'Successfully signed out' };
        const result = await authController.signOut(fakeSignOutData);
        expect(result).toStrictEqual(expectedResult);

        const token = await userRepository.findByToken(fakeSignOutData.token);
        expect(token).toBeNull();
      });
    });
    describe('with unknown token', () => {
      it('throws an error "Invalid token"', async () => {
        await setupExistingUser(userRepository, 'some-token');

        const fakeSignOutData = {
          token: 'invalid-token',
        };

        await expect(authController.signOut(fakeSignOutData)).rejects.toThrow(
          new UnauthorizedException('Invalid token'),
        );
      });
    });
  });
});
