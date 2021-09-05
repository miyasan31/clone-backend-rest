import { IsNotEmpty } from 'class-validator';

export class UserPropertyDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  profileBody: string;

  @IsNotEmpty()
  iconId: string;
}

// @IsNotEmpty()は「"",null,undefined」を受け入れない
