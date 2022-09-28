export interface User {
  _id: string;
  email: string;
  password: string;
  username?: string;
  fullname?: string;
  role?: number[];
  profilePictureURI?: string;
  disabled?: boolean;
  useSSO?: boolean;
  key?: string;
  secret?: string;
  mobile?: string;
  twoFA?: boolean;
  lastActive?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
}
