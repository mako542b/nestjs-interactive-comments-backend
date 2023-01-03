import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose"
import { User } from "src/users/user.schema";

export type CommentDocument = HydratedDocument<Comment>

@Schema()
export class Comment {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' , required: true})
    user: User;

    @Prop()
    content:string;

    @Prop()
    createdOn: string;

    @Prop()
    section: string;

    @Prop(raw([{
        ratingUserId: {type : String}, 
        rate: {type: String}
    }]))
    rated: [Record<string, any>];

    @Prop()
    parentId: string | null;

    @Prop()
    replyingTo: string | null;

}

export const CommentSchema = SchemaFactory.createForClass(Comment)