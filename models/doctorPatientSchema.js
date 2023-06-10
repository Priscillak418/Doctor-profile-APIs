import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorPatientSchema = new Schema({
  doctor: { type: String, ref: "Doctor" },
  patient: { type: String, ref: "Patient" },
});

const DoctorPatient = mongoose.model("DoctorPatient", doctorPatientSchema);

export default DoctorPatient;
