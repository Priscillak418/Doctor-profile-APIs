import express from "express";
import Patient from "../models/patientSchema.js";
import passport from 'passport';



const router = express.Router();

// Route to create a patient's profile
router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create a patient profile ${error.message}` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).exec();
    res.status(201).json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to find a patient profile ${error.message}` });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    Patient.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete a patient profile ${error.message}` });
  }
});

export default router;
