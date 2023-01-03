import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({
        unique: true,
    })
    login: string;

    @Prop({select:false})
    password:string;

    @Prop()
    avatar:string;
} 

export const UserSchema = SchemaFactory.createForClass(User)