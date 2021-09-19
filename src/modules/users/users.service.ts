import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 👨‍👩‍👧‍👦 全レコード取得
  async getAllUser(): Promise<User[]> {
    // find()で、全レコード取得
    // そのまま全レコードを返す
    return this.userRepository.find();
  }

  // 💁‍♂️ 単レコード取得
  async getOneUser(userId: string): Promise<User> {
    // findOne(id)で、idが該当するレコード取得
    const found = await this.userRepository.findOne(userId);

    // 該当レコードが見つからなかったら、404を返す
    if (!found) {
      throw new NotFoundException();
    }

    // 取得したレコードを返す
    return found;
  }

  // 🧩 新規レコード作成
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // getUserById()を呼び出して、idが該当するレコード取得
    // const userCheck = await this.getUserById(userId);

    // if (userCheck) {
    //   return 'すでに存在するIDです';
    // }

    // エンティティからインスタンスを作成
    const user = new User();

    // インスタンスに代入
    user.userId = createUserDto.userId;
    user.userName = createUserDto.userName;
    user.profileBody = createUserDto.profileBody;
    user.iconId = createUserDto.iconId;

    try {
      // save()でリポジトリを更新
      await this.userRepository.save(user);
    } catch (error) {
      // エラーが起きたら、500を返す
      throw new InternalServerErrorException();
    }

    // 作成したレコードを返す
    return user;
  }

  // ✨ レコード更新
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // getUserById()を呼び出して、idが該当するレコード取得
    const user = await this.getOneUser(userId);
    // 該当レコードのstatusにパラメーター代入
    user.userName = updateUserDto.userName;
    user.profileBody = updateUserDto.profileBody;
    user.iconId = updateUserDto.iconId;
    // save()で、該当レコード更新
    await this.userRepository.save(user);
    // 更新後のレコードを返す
    return user;
  }

  // 🔥 レコード削除
  async deleteUser(userId: string): Promise<void | string> {
    // delete(id)で、該当レコード削除
    const result = await this.userRepository.delete(userId);
    // 該当レコードが見つからなかったら、404を返す
    if (result.affected === 0) {
      throw new NotFoundException();
    } else {
      return 'success';
    }
  }
}
