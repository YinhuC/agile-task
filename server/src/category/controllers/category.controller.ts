import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Category } from '../category.entity';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { AuthUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/user.entity';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { CategoryMemberGuard } from '../guards/category-member.guard';
import { GetCategoryDto } from '../dto/get-category.dto';

@UseGuards(AuthenticatedGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('all')
  async getProjectCategories(
    @AuthUser() user: User,
    @Body() getCategoryDto: GetCategoryDto
  ): Promise<Category[]> {
    return await this.categoryService.getAllCategoriesByProjectId(
      user,
      getCategoryDto.projectId
    );
  }

  @Get(':id')
  @UseGuards(CategoryMemberGuard)
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(
    @AuthUser() user: User,
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    return await this.categoryService.createCategory(user, createCategoryDto);
  }

  @Put(':id')
  @UseGuards(CategoryMemberGuard)
  async updateCategory(
    @AuthUser() user: User,
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    return await this.categoryService.updateCategory(
      user,
      id,
      updateCategoryDto
    );
  }

  @Delete(':id')
  @UseGuards(CategoryMemberGuard)
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
