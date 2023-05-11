import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: String;

  @Prop()
  password: String;

  @Prop()
  firstName: String;

  @Prop()
  last_name: String;

  @Prop({ required: true, enum: ['male', 'female'] })
  gender: String;

  @Prop()
  birthday: Date;

  @Prop({ required: true, enum: ['admin', 'user'], default: 'user' })
  role: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
