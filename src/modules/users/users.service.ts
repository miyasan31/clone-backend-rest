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

  // ð¨âð©âð§âð¦ å¨ã¬ã³ã¼ãåå¾
  async getAllUser(): Promise<User[]> {
    // find()ã§ãå¨ã¬ã³ã¼ãåå¾
    // ãã®ã¾ã¾å¨ã¬ã³ã¼ããè¿ã
    return this.userRepository.find();
  }

  // ðââï¸ åã¬ã³ã¼ãåå¾
  async getOneUser(userId: string): Promise<User> {
    // findOne(id)ã§ãidãè©²å½ããã¬ã³ã¼ãåå¾
    const found = await this.userRepository.findOne(userId);

    // è©²å½ã¬ã³ã¼ããè¦ã¤ãããªãã£ããã404ãè¿ã
    if (!found) {
      throw new NotFoundException();
    }

    // åå¾ããã¬ã³ã¼ããè¿ã
    return found;
  }

  // ð§© æ°è¦ã¬ã³ã¼ãä½æ
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // getUserById()ãå¼ã³åºãã¦ãidãè©²å½ããã¬ã³ã¼ãåå¾
    // const userCheck = await this.getUserById(userId);

    // if (userCheck) {
    //   return 'ãã§ã«å­å¨ããIDã§ã';
    // }

    // ã¨ã³ãã£ãã£ããã¤ã³ã¹ã¿ã³ã¹ãä½æ
    const user = new User();

    // ã¤ã³ã¹ã¿ã³ã¹ã«ä»£å¥
    user.userId = createUserDto.userId;
    user.userName = createUserDto.userName;
    user.profileBody = createUserDto.profileBody;
    user.iconId = createUserDto.iconId;

    try {
      // save()ã§ãªãã¸ããªãæ´æ°
      await this.userRepository.save(user);
    } catch (error) {
      // ã¨ã©ã¼ãèµ·ãããã500ãè¿ã
      throw new InternalServerErrorException();
    }

    // ä½æããã¬ã³ã¼ããè¿ã
    return user;
  }

  // â¨ ã¬ã³ã¼ãæ´æ°
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // getUserById()ãå¼ã³åºãã¦ãidãè©²å½ããã¬ã³ã¼ãåå¾
    const user = await this.getOneUser(userId);
    // è©²å½ã¬ã³ã¼ãã®statusã«ãã©ã¡ã¼ã¿ã¼ä»£å¥
    user.userName = updateUserDto.userName;
    user.profileBody = updateUserDto.profileBody;
    user.iconId = updateUserDto.iconId;
    // save()ã§ãè©²å½ã¬ã³ã¼ãæ´æ°
    await this.userRepository.save(user);
    // æ´æ°å¾ã®ã¬ã³ã¼ããè¿ã
    return user;
  }

  // ð¥ ã¬ã³ã¼ãåé¤
  async deleteUser(userId: string): Promise<void | string> {
    // delete(id)ã§ãè©²å½ã¬ã³ã¼ãåé¤
    const result = await this.userRepository.delete(userId);
    // è©²å½ã¬ã³ã¼ããè¦ã¤ãããªãã£ããã404ãè¿ã
    if (result.affected === 0) {
      throw new NotFoundException();
    } else {
      return 'success';
    }
  }
}
