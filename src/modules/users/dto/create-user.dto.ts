import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userName: string;

  profileBody: string;

  iconId: string;
}

// @IsNotEmpty()は「"",null,undefined」を受け入れない
