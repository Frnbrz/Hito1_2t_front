import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dot';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  getUsers() {
    // return this.userRepository.find();
  }

  async getUser(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(user: UserDto) {
    // const newUser = this.userRepository.create(user);
    // return this.userRepository.save(newUser);

    await this.userRepository.checKEmailOrUsernameAvailable(
      user.email,
      user.username,
    );

    return await this.userRepository.insertUser(user);
  }

  async patchUser(id: string, user: UserDto): Promise<User> {
    return await this.userRepository.updateUser(id, user);
  }
}
