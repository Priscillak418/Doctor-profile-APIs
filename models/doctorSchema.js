import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  location: String,
  speciality: String,
  experiences: String,
  education: String,
  doctorsConnection: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

// module.exports = Doctor;
export default Doctor;
