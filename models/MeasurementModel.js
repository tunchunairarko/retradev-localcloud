const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const measurementSchema = new mongoose.Schema({
  username:{type: String,required:true},
  patientname:{type:String,required:true},
  measurementDate: {type: String},
  measurementType: {type: String},
  measuredResult: {type: String}
},{ timestamps: true });

module.exports = Prescription = mongoose.model("patient_measurements", measurementSchema);