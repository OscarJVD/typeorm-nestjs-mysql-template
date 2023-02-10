import { PostsModule } from './posts/posts.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/users/profile.entity';
import { User } from 'src/users/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Post } from 'src/posts/post.entity';

@Module({
  imports: [
    // Configure typeorm in the app module
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: "nestfazttypeorm",
      entities: [User, Profile, Post],
      synchronize: true, // only in development
    }),
    UsersModule,
    PostsModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})

export class AppModule { }
