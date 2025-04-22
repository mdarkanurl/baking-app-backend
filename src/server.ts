import app from './app';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db';
import { login, signup, deposit, transfer, find } from './routes';


app.use('/api/signup', signup);
app.use('/api/login', login);
app.use('/api/transfer', transfer);
app.use('/api/deposit', deposit);
app.use('/api/find', find);


const PORT = (process.env.PORT || 5000) as number;

app.listen(PORT, async () => {
 console.log(`http//localhost:${PORT}`);
 await connectDB();
});