import { IsNotEmpty } from 'class-validator';

export class GetCategoryDto {
  @IsNotEmpty()
  projectId: number;
}
