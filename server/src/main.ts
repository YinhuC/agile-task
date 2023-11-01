import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const isProd: boolean =
    configService.get<string>('REACT_APP_NODE_ENV') === 'production';

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: configService.get<string>('REACT_APP_SECRET'),
      resave: false,
      saveUninitialized: false,
      name: 'SESSION_ID',
      proxy: isProd,
      cookie: {
        maxAge: 86400000,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        domain: isProd ? '.onrender.com' : undefined,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(
      configService.get<number>('REACT_APP_API_PORT') || 3300,
      () => {
        console.log(
          `Running on Port ${
            configService.get<number>('REACT_APP_API_PORT') || 3300
          }`
        );
        console.log(
          `API URL: ${configService.get<string>('REACT_APP_API_URL')}`
        );
      }
    );
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
