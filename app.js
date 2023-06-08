import express from 'express'
import 'dotenv/config' 
import mongoose from 'mongoose'

const app = express()
const port = 5000

app.use(express.json());


//connect to the database
mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
);

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });


app.get('/',(req, res)  => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})