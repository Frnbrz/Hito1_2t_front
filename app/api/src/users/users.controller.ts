import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dot';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UserDto,
  ) {
    const userFound = await this.usersService.getUser(id);
    if (userFound) {
      return await this.usersService.patchUser(id, user);
    } else {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const userFound = await this.usersService.getUser(id);
    if (userFound) {
      return await this.usersService.deleteUser(id);
    } else {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  @Post()
  async createUser(@Body() newUser: UserDto): Promise<User> {
    return await this.usersService.createUser(newUser);
  }
}
