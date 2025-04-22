import { Schema, model } from 'mongoose';

interface IAccount {
 username: string;
 password: string;
 balance: number;
}

const accountSchema = new Schema<IAccount>({
 username: {
   type: String,
   required: true,
   unique: true,
 },
 password: {
   type: String,
   required: true,
 },
 balance: {
   type: Number,
   minLength: 8,
   required: true,
 },
});

const Account = model<IAccount>('Account', accountSchema);

export default Account;