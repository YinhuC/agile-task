import { IsNotEmpty, Length } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @Length(0, 20)
  name: string;
}
