import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';
import { MESSAGES, REGEXES } from 'src/utils/regex';

export class UpdateUserDto {
  @IsEmail()
  @IsDefined()
  @Length(2, 20)
  email?: string;

  @IsNotEmpty()
  @Length(0, 20)
  firstname?: string;

  @IsNotEmpty()
  @Length(0, 20)
  lastname?: string;

  @IsDefined()
  @IsNotEmpty()
  @Matches(REGEXES.PASSWORD_REGEX, { message: MESSAGES.PASSWORD_REGEX_MESSAGE })
  password?: string;

  authMethod?: string;
}
