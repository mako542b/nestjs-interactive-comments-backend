import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentDto } from './CommentDto';
import { CommentsService } from './comments.service';
import { rateInterface } from './interfaces';


@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async newMessage(
        @Body()commentInfo: CommentDto,
        @Request() req
    ) {
        const userId = req.user._id?.toString()
        return await this.commentsService.createComment(commentInfo, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':section')
    async getMessages(@Param('section')section: string) {
        return await this.commentsService.getAllSectionComments(section)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('rating')
    async handleRating(
        @Body('commentId') commentId:string, 
        @Body('rating') rate: rateInterface,
        @Request() req
    ) {
        const userId = req.user._id?.toString()
        return await this.commentsService.handleRating(commentId, rate, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCommet(
        @Param('id') id: string,
        @Request() req
    ) {
        const userId = req.user._id?.toString()
        return await this.commentsService.deleteComment(id, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async editComment(
        @Param('id') id:string, 
        @Body('newContent') newContent: string,
        @Request() req
    ) {
        const userId = req.user._id?.toString()
        return await this.commentsService.editComment(id, newContent, userId)
    }
}
