import { IsEmail, Length, Matches } from 'class-validator';
import { MESSAGES, REGEXES } from 'src/shared/utils/regex';

export class UpdateUserDto {
  @IsEmail()
  @Length(2, 20)
  email?: string;

  @Length(0, 20)
  firstname?: string;

  @Length(0, 20)
  lastname?: string;

  @Matches(REGEXES.PASSWORD_REGEX, { message: MESSAGES.PASSWORD_REGEX_MESSAGE })
  password?: string;

  authMethod?: string;
}
