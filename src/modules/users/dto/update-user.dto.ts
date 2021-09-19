import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  userName: string;

  profileBody: string;

  iconId: string;
}
