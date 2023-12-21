import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { UserDto } from './dto/create-user.dot';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(private datasource: DataSource) {}

  async insertUser(user: UserDto): Promise<User> {
    const newUser = await this.datasource
      .createQueryBuilder(User, 'user')
      .insert()
      .values({
        email: user.email,
        password: user.password,
        username: user.username,
      })
      .returning('id, username, email')
      .execute();

    return newUser.raw[0] as User;
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
  }

  async getUsers(): Promise<User[]> {
    return await this.datasource
      .createQueryBuilder(User, 'user')
      .select(['user.id', 'user.username', 'user.email'])
      .getMany();
  }

  async deleteUser(id: string): Promise<void> {
    await this.datasource
      .createQueryBuilder(User, 'user')
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  async updateUser(id: string, user: UserDto): Promise<User> {
    const updatedUser = await this.datasource
      .createQueryBuilder(User, 'user')
      .update()
      .set(user)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return updatedUser.raw[0] as User;
  }

  async getUserById(id: string): Promise<User> {
    return await this.datasource
      .createQueryBuilder(User, 'user')
      .where('id = :id', {
        id,
      })
      .getOne();
  }

  async checKEmailOrUsernameAvailable(
    email: string,
    username: string,
  ): Promise<void> {
    const user = await this.datasource
      .createQueryBuilder(User, 'user')
      .where('email =:email', { email })
      .orWhere('username =:username', { username })
      .getOne();

    if (user) {
      if (user?.username === username) {
        throw new ConflictException('username ya existe');
      } else if (user?.email == email) {
        throw new ConflictException('email ya existe');
      }
    }
  }
}
