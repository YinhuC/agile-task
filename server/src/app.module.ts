import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { GroupModule } from './group/group.module';
import { ProjectModule } from './project/project.module';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import { dataSourceOptions } from './database/data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      session: true,
    }),
    UserModule,
    AuthModule,
    GroupModule,
    ProjectModule,
    CategoryModule,
    TaskModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
