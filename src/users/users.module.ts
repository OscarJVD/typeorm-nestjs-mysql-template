import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from 'src/users/user.entity';
import { Profile } from 'src/users/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])], // decirle que entities usa el modulo
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // para que el servicio sea exportable
})

export class UsersModule {}
