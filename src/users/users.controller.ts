import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UpdateUserDto, CreateUserDto } from 'src/users/dto';
import { CreateProfileDto } from 'src/users/dto/create-profile.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
    ) { }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(":id")
  getUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser)
  }

  @Patch(":id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() user: UpdateUserDto
  ) {
    return this.usersService.updateUser(id, user)
  }

  @Delete(":id")
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id)
  }
  

  // Profile
  @Post(":id/profile")
  createProfile(
    @Param("id", ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto
  ) {
    return this.usersService.createProfile(id, profile)
  }
}
