import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  app.setGlobalPrefix('api');
  app.use(cookieParser(process.env.REACT_APP_JWT_SECRET));

  app.use(
    session({
      secret: process.env.REACT_APP_JWT_SECRET,
      resave: false,
      saveUninitialized: false,
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
