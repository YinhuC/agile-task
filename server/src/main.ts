import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(cookieParser(process.env.REACT_APP_SECRET));
  app.use(
    session({
      secret: process.env.REACT_APP_SECRET,
      resave: false,
      saveUninitialized: false,
      name: 'SESSION_ID',
      cookie: {
        maxAge: 86400000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(process.env.REACT_APP_API_PORT, () => {
      console.log(`Running on Port ${process.env.REACT_APP_API_PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
