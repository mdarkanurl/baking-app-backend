import { Request, Response } from 'express';
import Account from '../model/Account';

export const signup = async (req: Request, res: Response) => {
    const { username, password }: { username: string; password: string } = req.body;
 
  if (!username || !password) {
    res
      .status(400)
      .json({ message: 'Username or password not provided' });
    return;
  }
 
  try {
    const lowerUsername = username.toLowerCase();
    const checkUsername: any = await Account.findOne({
      username: lowerUsername
    });


    if (password.length < 8) {
      res
        .status(400)
        .json({ message: 'Password must be at least 8 characters long' });
        return;
    }


    if (checkUsername) {
      res.status(400).json({ message: 'Username already taken' });
      return;
    }


    const account = new Account({
      username: lowerUsername,
      password,
      balance: 0
    });


    await account.save();
    res.status(201).json({ message: 'Account created' });
    return;
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: 'Error creating account' });
    return;
  }
};


export const login = async (req: Request, res: Response) => {
    const { username, password }: { username: string; password: string } = req.body;

 if (!username || !password) {
   return res
     .status(400)
     .json({ message: 'Username or password not provided' });
 }

 try {
   const lowerUsername = username.toLowerCase();
   const checkUsername = await Account.findOne({ username: lowerUsername });


   if (!checkUsername) {
     return res
       .status(400)
       .json({ message: 'Username or password is incorrect' });
   }


   if (checkUsername.password !== password) {
     return res
       .status(400)
       .json({ message: 'Username or password is incorrect' });
   }


   return res.status(200).json({ message: 'Login successful' });
 } catch (error: any) {
   console.log(error.message);
   return res.status(500).json({ message: 'Error logging in' });
 }
};


export const deposit = async (req: Request, res: Response) => {
    const {
        username,
        password,
        amount
      }: { username: string; password: string; amount: number } = req.body;


      if (!username || !password || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Missing parameters' });
      }


      try {
        const lowerUsername = username.toLowerCase();
        const checkUsername: any = await Account.findOne({
          username: lowerUsername
        });


        if (!checkUsername) {
          return res
            .status(400)
            .json({ message: 'Username or password is incorrect' });
        }


        if (checkUsername.password !== password) {
          return res
            .status(400)
            .json({ message: 'Username or password is incorrect' });
        }


        const newAmount: number = parseInt(amount as any) + checkUsername.balance;

        await Account.updateOne(
          { username: lowerUsername },
          { balance: newAmount }
        );
        return res.status(201).json({ message: 'Deposit successful' });
      } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ message: 'Error depositing funds' });
      }
};


export const transfer = async (req: Request, res: Response) => {
    const {
        username,
        recipient,
        password,
        amount
      }: {
        username: string;
        password: string;
        recipient: string;
        amount: number;
      } = req.body;
     
      if (!username || !password || !recipient || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Missing parameters' });
      }
     
      try {
        const lowerUsername = username.toLowerCase();
        const lowerrecipient = recipient.toLowerCase();


        if (lowerUsername === lowerrecipient) {
          return res.status(400).json({ message: 'Cannot transfer to self' });
        }


        const checkUsername: any = await Account.findOne({
          username: lowerUsername
        });


        if (!checkUsername) {
          return res
            .status(400)
            .json({ message: 'Username or password is incorrect' });
        }


        if (checkUsername.password !== password) {
          return res
            .status(400)
            .json({ message: 'Username or password is incorrect' });
        }


        if (checkUsername.balance < amount) {
          return res.status(400).json({ message: 'Insufficient funds' });
        }


        const checkrecipient: any = await Account.findOne({
          username: lowerrecipient
        });


        if (!checkrecipient) {
          return res.status(400).json({ message: 'recipient not found' });
        }


        const newAmount: number = checkUsername.balance - parseInt(amount as any);
        await Account.updateOne(
          { username: lowerUsername },
          { balance: newAmount }
        );

        const newAmount2: number = checkrecipient.balance + parseInt(amount as any);

        await Account.updateOne(
          { username: lowerrecipient },
          { balance: newAmount2 }
        );

        return res.status(201).json({ message: 'Transfer successful' });
      } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ message: 'Error transferring funds' });
      }
};


export const find = async (req: Request, res: Response) => {
    const { username }: { username: string } = req.params as any;

 if (!username) {
   return res.status(400).json({ message: 'Missing parameters' });
 }

 try {
   const lowerUsername = username.toLowerCase();
   const checkUsername: any = await Account.findOne({
     username: lowerUsername
   });


   if (!checkUsername) {
     return res.status(400).json({ message: 'Username not found' });
   }


   const response = {
     username: checkUsername.username,
     balance: checkUsername.balance
   };

   return res.status(200).json({ user: response });
 } catch (error: any) {
   console.log(error.message);
   return res.status(500).json({ message: 'Error finding user' });
 }
};