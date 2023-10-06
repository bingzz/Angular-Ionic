import mongoose, { connect, ConnectOptions } from 'mongoose';
import { ATLAS_URI } from '..';

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export function dbConnect() {
  connect(ATLAS_URI!, connectOptions as ConnectOptions)
    .then(() => {
      console.log('Connection to DB -> Success');
    }, async (error: Error) => {
      console.error('Failed to connect to DB:', error.message);

      if (error.message.includes('Collection not found')) {
        try {
          await mongoose.connection.createCollection('spotify-mock');
          console.log('Collection created');
        } catch (err) {
          console.error('Failed to create collection', err);
        }
      }
    });
}