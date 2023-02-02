import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentDto } from './CommentDto';
import { CommentsService } from './comments.service';
import { rateInterface } from './interfaces';
// @UseGuards(JwtAuthGuard)


@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async newMessage(@Body()commentInfo: CommentDto) {
        return await this.commentsService.createComment(commentInfo)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':section')
    async getMessages(@Param('section')section: string) {
        return await this.commentsService.getAllSectionComments(section)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('rating')
    async handleRating(@Body('commentId') commentId:string, @Body('rating') rate: rateInterface) {
        return await this.commentsService.handleRating(commentId, rate)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCommet(@Param('id') id:string) {
        return await this.commentsService.deleteComment(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async editComment(@Param('id') id:string, @Body('newContent') newContent: string) {
        return await this.commentsService.editComment(id, newContent)
    }
}
