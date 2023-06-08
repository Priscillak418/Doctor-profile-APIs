import mongoose from 'mongoose';
const { Schema } = mongoose;

const patientSchema = new Schema({
    // Patient fields...
    name: String,
    gender: String,
    dateOfBirth: Date,
    contactInformation: Number,
    medicalHistory: String,
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor'
    }
});
  
const Patient = mongoose.model('Patient', patientSchema);
  
module.exports = Patient;
  