import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  index: number;
}
