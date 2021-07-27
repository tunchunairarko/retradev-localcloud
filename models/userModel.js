const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    displayName: { type: String },
    affiliation: {type: String},
    institution: {type: String},
    country: {type: String},
    dateOfBirth: {type:String}
});

module.exports = User = mongoose.model("user", userSchema);