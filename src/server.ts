import app from './app';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db';

const PORT = (process.env.PORT || 5000) as number;

app.listen(PORT, async () => {
 console.log(`http://localhost:${PORT}`);
 await connectDB();
});