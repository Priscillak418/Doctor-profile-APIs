import express from 'express'
import 'dotenv/config' 
import mongoose from 'mongoose'
import doctorRoutes from './routes/doctorRoutes.js'
import patientRoutes from './routes/patientRoutes.js'
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import Token from './models/tokenSchema.js';

const app = express()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Passport middleware
app.use(passport.initialize());


// Define the Bearer strategy
// Define the Bearer strategy
passport.use(new BearerStrategy((tokenValue, done) => {
  Token.findOne({ value: tokenValue }, (err, foundToken) => {
    if (err) {
      return done(err);
    }
    if (foundToken) {
      return done(null, true);
    } else {
      return done(null, false);
    }
  });
}));



//connect to the database
mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
);


//Routes
//Home route
app.get('/',(req, res)  => {
  res.send('Hello World')
})

//Doctor route
app.use('/doctor', doctorRoutes);

//Patient route
app.use("/patient", patientRoutes);


export default app;