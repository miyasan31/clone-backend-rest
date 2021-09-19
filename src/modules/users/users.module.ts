import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 追加
import { User } from './entity/user.entity'; // 追加
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 追加
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
