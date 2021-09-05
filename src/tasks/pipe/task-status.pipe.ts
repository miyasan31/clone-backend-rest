import { BadRequestException, PipeTransform } from '@nestjs/common';

export class TaskStatusPipe implements PipeTransform {
  readonly allowStatus = ['OPEN', 'PROGRESS', 'DONE'];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      // falseが帰ってきたらエラーを投げる
      throw new BadRequestException();
    }

    // trueが帰ってきたらvalueを返す
    return value;
  }

  private isStatusValid(status: any) {
    const result = this.allowStatus.indexOf(status);
    return result !== -1; // ステータスが「'OPEN', 'PROGRESS', 'DONE'」→ true
  }
}
