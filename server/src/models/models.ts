import mongodb from 'mongodb'

export interface Song {
  _id?: mongodb.ObjectId
  title: string
}