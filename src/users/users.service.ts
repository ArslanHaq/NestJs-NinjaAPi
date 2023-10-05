import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly users: CreateUserDto[] = [
    {
      userId: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      userId: '2',
      username: 'chris',
      password: 'secret',
    },
    {
      userId: '3',
      username: 'maria',
      password: 'guess',
    },
  ];
  create(createUserDto: CreateUserDto) {
    const newUser: CreateUserDto = {
      ...createUserDto,
      userId: Date.now().toString(),
    };
    this.users.push(newUser);
    return this.users;
  }

  findAll() {
    return this.users;
  }

  async findOne(username: string): Promise<CreateUserDto | undefined> {
    if (this.users.find((user) => user.username === username) === undefined) {
      throw new NotFoundException('User not found');
    }
    return this.users.find((user) => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
