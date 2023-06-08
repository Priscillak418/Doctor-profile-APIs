import mongoose from 'mongoose';
const { Schema } = mongoose;


const doctorSchema = new Schema({
    firstName: String,
    lastName: String,
    location: String,
    speciality: String,
    experiences: String,
    education: String,
    reviews: String,
    doctorsConnection: String,
    patients: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    Availability: Date,
    LanguagesSpoken: String
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;