import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
