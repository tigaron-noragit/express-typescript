import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    _id: String,
    email: String,
    password: String,
    username: String,
    fullname: String,
    role: [Number],
    profilePictureURI: String,
    disabled: Boolean,
    useSSO: Boolean,
    key: String,
    secret: String,
    mobile: String,
    twoFA: String,
    lastActive: Date,
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

const userModel = model<User & Document>('User', userSchema);

export default userModel;
