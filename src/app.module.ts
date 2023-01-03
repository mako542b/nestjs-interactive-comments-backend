import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/?readPreference=primary&ssl=false'), 
            AuthModule, 
            UsersModule, 
            CommentsModule],
})
export class AppModule {}
