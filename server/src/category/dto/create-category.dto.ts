import { IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(0, 50)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  projectId: number;
}
