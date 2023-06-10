import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({
  // Patient fields...
  _id: String,
  name: String,
  gender: String,
  dateOfBirth: Date,
  contactInformation: Number,
  medicalHistory: String,
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
