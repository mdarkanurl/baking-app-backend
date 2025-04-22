import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const TESTING_MONGO_URI = process.env.TESTING_MONGO_URI as string;

export async function connectDB() {
 try {
    await connect(MONGO_URI);
    console.log('Database is connected successfully');
 } catch (error: any) {
    console.log(error.message);
 }
}

export async function testDB() {
   await connect(TESTING_MONGO_URI);
}