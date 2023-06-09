import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.REACT_APP_JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer],
})
export class AuthModule {}
