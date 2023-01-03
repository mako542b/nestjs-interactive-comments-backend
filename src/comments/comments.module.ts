import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comments.schema';
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [MongooseModule.forFeature([{name: 'CommentSchema', schema: CommentSchema}]), AuthModule],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
