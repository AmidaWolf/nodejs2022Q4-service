import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserResponse,
} from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  findAllUsers(): UserResponse[] {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  findUserById(@Param() params: Record<string, string>): UserResponse {
    return this.userService.findUserById(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserResponse {
    return this.userService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
