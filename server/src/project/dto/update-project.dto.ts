import { IsOptional, Length } from 'class-validator';

export class UpdateProjectDto {
  @Length(0, 30)
  @IsOptional()
  name?: string;

  @Length(0, 100)
  @IsOptional()
  description?: string;
}
