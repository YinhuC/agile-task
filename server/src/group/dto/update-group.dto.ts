import { IsOptional, MaxLength } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @MaxLength(20)
  name?: string;

  emails?: string[];
}
