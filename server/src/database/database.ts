import * as mongodb from 'mongodb'
import { Song } from '../models/models'

export const collections: {
  playlist?: mongodb.Collection<Song>
} = {}

const schemaValidation = async (db: mongodb.Db) => {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['song'],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: 'string',
          description: `'Song' is required`,
          minLength: 2
        }
      }
    }
  }

  await db.command({
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    console.error(error)
  })
}

export const connectDatabase = async (uri: string) => {
  const client = new mongodb.MongoClient(uri)
  await client.connect()

  const db = client.db('playlist')
  await schemaValidation(db)

  const playlist = db.collection<Song>('playlist')
  collections.playlist = playlist
}