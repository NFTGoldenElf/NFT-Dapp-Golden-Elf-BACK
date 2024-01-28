import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    profilePhoto: string;

    @Prop({ required: true, unique: true })
    accountAddress: string;
}

export const UserSchema = SchemaFactory.createForClass(User);