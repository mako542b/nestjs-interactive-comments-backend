import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument } from './comments.schema';
import { CommentDto } from './CommentDto';
import { rateInterface } from './interfaces';



@Injectable()
export class CommentsService {
    constructor(@InjectModel('CommentSchema') private Comment: Model<CommentDocument>) {}

    async createComment(commentInfo: CommentDto ) {
        const { user, content, createdOn, section, parentId, replyingTo } = commentInfo
        const newComment = new this.Comment({user, content, createdOn, section, rated:[], parentId, replyingTo})
        return await newComment.save()
    }

    async getAllSectionComments(section:string) {
        let comments = await this.Comment.find({section}).populate('user').exec()
            comments = comments.filter(comment => comment.user)
        return comments
    }

    async handleRating(id: string, rating: rateInterface) {
        const comment = await this.Comment.findById(id)
        const index = comment.rated.findIndex(rate => rate.ratingUserId === rating.ratingUserId)
        if(index < 0) comment.rated.push(rating)
        else if(comment.rated[index].rate === rating.rate) comment.rated.splice(index,1)
        else comment.rated[index] = rating
        return await comment.save()
    }

    async deleteComment(id: string) {
        const comment = await this.Comment.findByIdAndDelete(id)
        return comment
    }

    async editComment(id:string, newContent: string) {
        const editingComment = await this.Comment.findById(id)
        editingComment.content = newContent
        return await editingComment.save()
    }

}
