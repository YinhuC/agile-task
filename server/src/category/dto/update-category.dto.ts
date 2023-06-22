import { IsOptional, Length } from 'class-validator';

export class UpdateCategoryDto {
  @Length(0, 50)
  @IsOptional()
  name: string;

  @IsOptional()
  index: number;
}
