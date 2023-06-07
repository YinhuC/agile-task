import { Length, Matches } from 'class-validator';
import { MESSAGES, REGEXES } from 'src/utils/regex';

export class UpdateUserDto {
  @Length(2, 20)
  @Matches(REGEXES.EMAIL_REGEX, { message: MESSAGES.EMAIL_REGEX_MESSAGE })
  email?: string;

  @Length(0, 20)
  firstname?: string;

  @Length(0, 20)
  lastname?: string;

  @Matches(REGEXES.PASSWORD_REGEX, { message: MESSAGES.PASSWORD_REGEX_MESSAGE })
  password?: string;

  authMethod?: string;
}
