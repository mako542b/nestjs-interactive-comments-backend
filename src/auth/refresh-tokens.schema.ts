import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type tokenDokument = HydratedDocument<Token>

@Schema()
export class Token {
    
    @Prop()
    token: string

    @Prop(
        { unique: true }
        )
    userId: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)