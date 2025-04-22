import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import signup from './routes/signup';
// import login from './routes/login';
// import deposit from './routes/deposit';
// import find from './routes/find';
// import transfer from './routes/transfer';


app.use('/api/signup', signup);
// app.use('/api/login', login);
// app.use('/api/transfer', transfer);
// app.use('/api/deposit', deposit);
// app.use('/api/find', find);

import { Request, Response } from 'express';

app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});

export default app;