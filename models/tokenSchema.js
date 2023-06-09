import mongoose from 'mongoose';
const { Schema } = mongoose;


const tokenSchema = new Schema({
  value: String
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
