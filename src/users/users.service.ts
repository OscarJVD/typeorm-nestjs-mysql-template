import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto, CreateUserDto } from 'src/users/dto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { CreateProfileDto } from 'src/users/dto/create-profile.dto';
import { Profile } from 'src/users/profile.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ) { }

  async createUser(user: CreateUserDto) {

    // Validate if username exists
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username
      }
    })

    if (userFound) {
      return new HttpException('Username already exists', HttpStatus.CONFLICT)
    }

    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)
  }

  getUsers() {
    return this.userRepository.find({
      relations: ['posts', 'profile']
    })
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['posts']
    })

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return userFound
  }

  async updateUser(id: number, user: UpdateUserDto) {

    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const updateUser = Object.assign(userFound, user)
    return this.userRepository.save(updateUser)
    // return this.userRepository.update({ id }, user)
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id })

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return result
  }

  async createProfile(id: number, profile: CreateProfileDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const newProfile = this.profileRepository.create(profile)
    const savedProfile = await this.profileRepository.save(newProfile)

    userFound.profile = savedProfile

    return this.userRepository.save(userFound)
  }
}
