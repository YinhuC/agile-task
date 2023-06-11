import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './shared/config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { GroupModule } from './group/group.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({
      session: true,
    }),
    UserModule,
    AuthModule,
    GroupModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
