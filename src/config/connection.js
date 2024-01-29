import mongoose from 'mongoose';
import 'dotenv/config'

const connectionString = 'mongodb://127.0.0.1:27017/ecommerce';

  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }

export default {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 3000,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    MONGO_LOCAL_URL: process.env.MONGO_LOCAL_URL
}