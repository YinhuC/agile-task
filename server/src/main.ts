import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const data: any = dotenv.parse(fs.readFileSync('../.env'));

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://agile-tasker.onrender.com/'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: data.REACT_APP_SECRET,
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
    await app.listen(process.env.PORT || 3300, () => {
      console.log(`Running on Port ${process.env.PORT || 3300}`);
      console.log(`API URL: ${data.REACT_APP_API_URL}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
