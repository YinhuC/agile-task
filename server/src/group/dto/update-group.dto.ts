import { IsNotEmpty, Length } from 'class-validator';

export class UpdateGroupDto {
  @IsNotEmpty()
  @Length(0, 20)
  name: string;
}
