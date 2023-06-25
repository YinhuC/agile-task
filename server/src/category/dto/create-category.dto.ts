import { IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(0, 30)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  projectId: number;
}
