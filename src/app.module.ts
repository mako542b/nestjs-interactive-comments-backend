import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
            MongooseModule.forRoot(process.env.MONGO_URI), 
            AuthModule, 
            UsersModule, 
            CommentsModule],
})
export class AppModule {}
