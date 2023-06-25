import { IsOptional, Length } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @Length(0, 30)
  name: string;

  @IsOptional()
  @Length(0, 100)
  description: string;
}
