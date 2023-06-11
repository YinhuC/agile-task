import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './shared/config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { GroupController } from './group/group.controller';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({
      session: true,
    }),
    UserModule,
    AuthModule,
    GroupModule,
  ],
  controllers: [AppController, GroupController],
  providers: [AppService],
})
export class AppModule {}
