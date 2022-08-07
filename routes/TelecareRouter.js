const router = require("express").Router();
const auth = require("../middleware/auth");
const axios = require("axios");
const Prescription = require("../models/PrescriptionModel");
const Measurement = require("../models/MeasurementModel");
require("dotenv").config();

function dumpError(err) {
  if (typeof err === "object") {
    if (err.message) {
      console.log("\nMessage: " + err.message);
    }
    if (err.stack) {
      console.log("\nStacktrace:");
      console.log("====================");
      console.log(err.stack);
    }
  } else {
    console.log("dumpError :: argument is not an object");
  }
}
router.get("/prescription", auth, async (req, res) => {
  const prescriptions = await Prescription.find().sort({ updatedAt: -1 });
  res.json(prescriptions);
});
router.get("/measurement", auth, async (req, res) => {
  const measurements = await Measurement.find().sort({ updatedAt: -1 });
  res.json(measurements);
});

router.post("/prescription/new", auth, async (req, res) => {
  try {
    let {
      username,
      patientname,
      prescriptionMsg,
      prescriptionSchedule,
      prescriptionType,
      prescriptionPriority,
    } = req.body;
    const newPrescription = new Prescription({
      username,
      patientname,
      prescriptionMsg,
      prescriptionSchedule,
      prescriptionType,
      prescriptionPriority,
    });
    const savedPrescription = await newPrescription.save();
    const prescriptions = await Prescription.find().sort({ updatedAt: -1 });

    res.json(prescriptions);
  } catch (err) {
    dumpError(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/measurement/new", auth, async (req, res) => {
  try {
    let {
      username,
      patientname,
      measurementType,
      measurementDate,
      measurementData,
    } = req.body;
    var measuredResult = "";
    if (measurementType == "bp") {
      measuredResult =
        measurementData.top + "/" + measurementData.bottom + " mmHg";
    } else if (measurementType == "pulse") {
      measuredResult = measurementData.top + "BPM";
    } else {
      measuredResult = measurementData.top + "°C";
    }

    const newMeasurement = new Measurement({
      username,
      patientname,
      measurementType,
      measurementDate,
      measuredResult,
    });
    const savedMeasurement = await newMeasurement.save();
    const measurements = await Measurement.find().sort({ updatedAt: -1 });

    res.json(measurements);
  } catch (err) {
    dumpError(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
