import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 追加
import { Task } from './entity/task.entity'; // 追加
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // 追加
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
