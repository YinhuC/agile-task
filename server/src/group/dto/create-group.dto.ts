import { IsNotEmpty, Length } from 'class-validator';

export class CreateGroupDTO {
  @IsNotEmpty()
  @Length(0, 20)
  name: string;
}
