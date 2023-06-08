import express from 'express';
import Doctor from '../models/doctorSchema.js';


const router = express.Router();



// Route to create a doctor's profile
router.post('/', async (req, res) => {
    const doctor = new Doctor(req.body);

    try {
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a doctor profile' });
    }
});



export default router;

