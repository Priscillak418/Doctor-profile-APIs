import express from 'express'
import 'dotenv/config' 
import mongoose from 'mongoose'
import doctorRoutes from './routes/doctorRoutes.js'

const app = express()
const port = 5000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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


//Routes
//Home route
app.get('/',(req, res)  => {
  res.send('Hello World')
})

//Doctor route
app.use('/doctor', doctorRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})