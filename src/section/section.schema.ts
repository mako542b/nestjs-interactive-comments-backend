import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SectionDocument = HydratedDocument<Section>

@Schema()
export class Section {
    @Prop()
    user: string

    @Prop()
    user2: string
}

export const SectionSchema = SchemaFactory.createForClass(Section)