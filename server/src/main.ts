import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: process.env.REACT_APP_CLIENT_URL,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: process.env.REACT_APP_SECRET,
      resave: false,
      saveUninitialized: false,
      name: 'SESSION_ID',
      proxy: process.env.REACT_APP_NODE_ENV === 'production',
      cookie: {
        maxAge: 86400000,
        secure: process.env.REACT_APP_NODE_ENV === 'production',
        sameSite:
          process.env.REACT_APP_NODE_ENV === 'production' ? 'none' : 'lax',
        domain:
          process.env.REACT_APP_NODE_ENV === 'production'
            ? '.onrender.com'
            : undefined,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(process.env.REACT_APP_API_PORT || 3300, () => {
      console.log(`Running on Port ${process.env.REACT_APP_API_PORT || 3300}`);
      console.log(`API URL: ${process.env.REACT_APP_API_URL}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
