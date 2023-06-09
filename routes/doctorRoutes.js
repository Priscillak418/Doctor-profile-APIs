// import express from 'express';
// import Doctor from '../models/doctorSchema.js';


// const router = express.Router();



// // Route to create a doctor's profile
// router.post('/', async (req, res) => {
//     const doctor = new Doctor(req.body);

//     try {
//         await doctor.save();
//         res.status(201).json(doctor);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create a doctor profile' });
//     }
// });



// export default router;



import express from "express";
import Doctor from "../models/doctorSchema.js";
import Patient from "../models/patientSchema.js";
import DoctorPatient from "../models/doctorPatientSchema.js";
import DoctorPatientReview from "../models/doctorPatientReviewSchema.js";
import Token from '../models/tokenSchema.js';


const router = express.Router();

// Route to create a doctor's profile
router.post("/", async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create a doctor profile ${error.message}` });
  }
});

//find a doctor's profile
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).exec();
    res.status(201).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find a doctor profile ${error.message}` });
  }
});


//Updating a doctor's profile
router.post("/:id", async (req, res) => {
  try {
    await Doctor.updateOne({ _id: req.params.id }, req.body);
    const doctor = await Doctor.findById(req.params.id).exec();
    res.status(201).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find a doctor profile ${error.message}` });
  }
});


//Delete a doctor's profile
router.delete("/:id", async (req, res) => {
  try {
    await Doctor.deleteOne({ _id: req.params.id }).exec();
    res.status(201).json({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete a doctor profile ${error.message}` });
  }
});


//Creates a relationship between the doctor and the patient or doctor can add a patient to their profile.
router.post("/:id/patients", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).exec();
    const patient = await Patient.findById(req.body.patient_id).exec();
    const doctorPatient = new DoctorPatient({
      doctor: req.params.id,
      patient: req.body.patient._id,
    });

    const relationShip = await doctorPatient.save();
    res.status(201).json({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find a doctor patients ${error.message}` });
  }
});


//See the list of patients the doctor is responsible for.
router.get("/:id/patients", async (req, res) => {
  try {
    const results = await DoctorPatient.find({
      doctor: req.params.id,
    }).populate("patient");
    const response = results.map((v) => v.patient);
    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find a doctor profile ${error.message}` });
  }
});


//Patient posting reviews on  a doctor.
router.post("/:id/patients/reviews", async (req, res) => {
  try {
    const doctorPatientReview = new DoctorPatientReview({
      doctor: req.params.id,
      patient: req.body.patient_id,
      review: req.body.review,
    });

    const review = await doctorPatientReview.save();
    res.status(201).json({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find a doctor patients ${error.message}` });
  }
});



//Getting back the reviews on a doctor.
router.get("/:id/patients/reviews", async (req, res) => {
  try {
    const result = await DoctorPatientReview.find({
      doctor: req.params.id,
    }).populate("patient");
    const response = result.map((v) => {
      return {
        patient: v.patient,
        review: v.review,
      };
    });

    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find a doctor patients ${error.message}` });
  }
});


// // Route to create a new token
// router.post('/tokens', async (req, res) => {
//   try {
//     const tokenValue = req.body.token;
//     const token = new Token();
//     token.value = tokenValue; // Assign the token value to the `value` field
//     await token.save();
//     res.status(201).json(token);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create a token' });
//   }
// });


// Route to create a new token
router.post('/tokens', async (req, res) => {
  try {
    const tokenValue = await Token.create(req.body);
    res.status(201).json(tokenValue);
  } catch (error) {
    res
    .status(500)
    .json({ error: 'Failed to create a token' });
  }
});




router.delete("/:id/patients", async (req, res) => {
  try {
    const patientDoctor = {
      doctor: req.params.id,
      patient: req.body.patient_id,
    };
    await DoctorPatient.deleteOne(patientDoctor).exec();
    res.status(201).json({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete a doctor patients ${error.message}` });
  }
});



export default router;

