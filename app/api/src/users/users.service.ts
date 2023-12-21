import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dot';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUser(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(user: UserDto) {
    await this.userRepository.checKEmailOrUsernameAvailable(
      user.email,
      user.username,
    );

    const cryptPassword = await this.userRepository.cryptPassword(
      user.password,
    );

    user.password = cryptPassword;

    return await this.userRepository.insertUser(user);
  }

  async patchUser(id: string, user: UserDto): Promise<User> {
    return await this.userRepository.updateUser(id, user);
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUser(id);
  }
}
