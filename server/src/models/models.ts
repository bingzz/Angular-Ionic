import { Schema, model } from "mongoose"

export interface User {
  id: string
  username: string
  email: string
  password: string
}

export interface Song {
  id: string
  title: string
  url: string
}

export interface ResponseData {
  code: number,
  created?: boolean,
  message?: string
  data?: any
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

const SongSchema = new Schema<Song>({
  title: { type: String, required: true },
  url: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

export const UserModel = model<User>('User', UserSchema)
export const SongModel = model<Song>('song', SongSchema)