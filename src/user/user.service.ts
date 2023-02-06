import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
  UserResponse,
} from './user.interface';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  private validateId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`User id is not uuid v4 format`);
    }
  }

  createUser(user: CreateUserDto): UserResponse {
    const newUser: User = {
      id: uuidv4(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    this.users.push(newUser);

    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  getAllUsers(): UserResponse[] {
    const users = this.users;

    return users.map((user) => ({
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  findUserById(id: string): UserResponse {
    this.validateId(id);

    const foundUserIndex = this.users.findIndex((user) => user.id === id);

    if (foundUserIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return {
      id: this.users[foundUserIndex].id,
      login: this.users[foundUserIndex].login,
      version: this.users[foundUserIndex].version,
      createdAt: this.users[foundUserIndex].createdAt,
      updatedAt: this.users[foundUserIndex].updatedAt,
    };
  }

  updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): UserResponse {
    this.validateId(id);

    const foundUserIndex = this.users.findIndex((user) => user.id === id);

    if (foundUserIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    const foundUser = this.users[foundUserIndex];
    if (foundUser.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(`Old password is incorrect.`);
    }
    foundUser.password = updatePasswordDto.newPassword;
    foundUser.version++;
    foundUser.updatedAt = new Date().getTime();

    this.users[foundUserIndex] = foundUser;

    return {
      id: foundUser.id,
      login: foundUser.login,
      version: foundUser.version,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    };
  }

  removeUser(id: string) {
    this.validateId(id);

    const foundUserIndex = this.users.findIndex((user) => user.id === id);

    if (foundUserIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    this.users.splice(foundUserIndex, 1);
  }
}
