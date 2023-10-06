import { Schema, model } from "mongoose";

export interface ResponseData {
  code: number,
  created?: boolean,
  message?: string;
  data?: any;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  token?: string;
}

export interface Song {
  id: string;
  title: string;
  url: string;
}

export interface Album {
  id: string,
  userId: string,
  name: string;
  img?: string;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const SongSchema = new Schema<Song>({
  title: { type: String, required: true },
  url: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const AlbumSchema = new Schema<Album>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: Buffer, required: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const UserModel = model<User>('user', UserSchema);
export const SongModel = model<Song>('song', SongSchema);
export const AlbumModel = model<Album>('album', AlbumSchema);