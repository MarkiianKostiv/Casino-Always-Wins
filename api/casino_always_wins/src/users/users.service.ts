import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  getAllUsers() {
    return this.usersRepository.find();
  }

  async updateUserInfo(id: string, username: string) {
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isThisUsernameExist = await this.usersRepository.findOne({
      where: { username: username },
    });

    if (isThisUsernameExist) {
      throw new ConflictException(`Username ${username} is already taken`);
    }

    user.username = username;
    return this.usersRepository.save(user);
  }
}
