import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPropertyDto } from './dto/user-property.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 👨‍👩‍👧‍👦 全レコード取得
  async getUsers(): Promise<User[]> {
    // find()で、全レコード取得
    // そのまま全レコードを返す
    return this.userRepository.find();
  }

  // 💁‍♂️ 単レコード取得
  async getUserById(userId: string): Promise<User> {
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
  async createUser(userPropertyDto: UserPropertyDto): Promise<User> {
    // リクエストボディからデータを取得
    const { userId, userName, profileBody, iconId } = userPropertyDto;

    // getUserById()を呼び出して、idが該当するレコード取得
    // const userCheck = await this.getUserById(userId);

    // if (userCheck) {
    //   return 'すでに存在するIDです';
    // }

    // エンティティからインスタンスを作成
    const user = new User();

    // インスタンスに代入
    user.userId = userId;
    user.userName = userName;
    user.profileBody = profileBody;
    user.iconId = iconId;

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

  // ✨ レコード更新
  async updateUser(
    userId: string,
    userName: string,
    profileBody: string,
    iconId: string,
  ): Promise<User> {
    // getUserById()を呼び出して、idが該当するレコード取得
    const user = await this.getUserById(userId);
    // 該当レコードのstatusにパラメーター代入
    user.userName = userName;
    user.profileBody = profileBody;
    user.iconId = iconId;
    // save()で、該当レコード更新
    await this.userRepository.save(user);
    // 更新後のレコードを返す
    return user;
  }
}
