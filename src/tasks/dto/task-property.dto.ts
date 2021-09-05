import { IsNotEmpty } from 'class-validator';

export class TaskPropertyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

// @IsNotEmpty()は「"",null,undefined」を受け入れない
