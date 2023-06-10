import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorPatientReviewSchema = new Schema({
  doctor: { type: String, ref: "Doctor" },
  patient: { type: String, ref: "Patient" },
  review: String,
});

const DoctorPatientReview = mongoose.model(
  "DoctorPatientReview",
  doctorPatientReviewSchema
);

export default DoctorPatientReview;
