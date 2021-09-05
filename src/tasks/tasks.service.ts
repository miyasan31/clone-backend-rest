import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskPropertyDto } from './dto/task-property.dto';
import { Task } from './entity/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // 👨‍👩‍👧‍👦 全レコード取得
  async getTasks(): Promise<Task[]> {
    // find()で、全レコード取得
    // そのまま全レコードを返す
    return this.taskRepository.find();
  }

  // 💁‍♂️ 単レコード取得
  async getTaskById(id: number): Promise<Task> {
    // findOne(id)で、idが該当するレコード取得
    const found = await this.taskRepository.findOne(id);

    // 該当レコードが見つからなかったら、404を返す
    if (!found) {
      throw new NotFoundException();
    }

    // 取得したレコードを返す
    return found;
  }

  // 🧩 新規レコード作成
  async createTask(taskPropertyDto: TaskPropertyDto): Promise<Task> {
    // リクエストボディからデータを取得
    const { title, description } = taskPropertyDto;

    // エンティティからインスタンスを作成
    const task = new Task();

    // インスタンスに代入
    task.title = title;
    task.description = description;
    task.status = 'OPEN';

    try {
      // save()でリポジトリを更新
      await this.taskRepository.save(task);
    } catch (error) {
      // エラーが起きたら、500を返す
      throw new InternalServerErrorException();
    }

    // 作成したレコードを返す
    return task;
  }

  // 🔥 レコード削除
  async deleteTask(id: number): Promise<void | string> {
    // delete(id)で、該当レコード削除
    const result = await this.taskRepository.delete(id);
    // 該当レコードが見つからなかったら、404を返す
    if (result.affected === 0) {
      throw new NotFoundException();
    } else {
      return 'success';
    }
  }

  // ✨ レコード更新
  async updateTask(id: number, status: string): Promise<Task> {
    // getTaskById()を呼び出して、idが該当するレコード取得
    const task = await this.getTaskById(id);
    // 該当レコードのstatusにパラメーター代入
    task.status = status;
    // save()で、該当レコード更新
    await this.taskRepository.save(task);
    // 更新後のレコードを返す
    return task;
  }
}
