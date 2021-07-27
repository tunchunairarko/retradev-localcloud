const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const prescriptionSchema = new mongoose.Schema({
  username:{type: String,required:true},
  patientname:{type:String,required:true},
  prescriptionMsg: {type: String},
  prescriptionType: {type: String},
  prescriptionSchedule: {type: String},
  prescriptionPriority: {type: String}
},{ timestamps: true });

module.exports = Prescription = mongoose.model("robot_prescriptions", prescriptionSchema);