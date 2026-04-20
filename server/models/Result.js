const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, trim: true, lowercase: true },
  wpm:          { type: Number, required: true },
  accuracy:     { type: Number, required: true },
  correctWords: { type: Number, required: true },
  errors:       { type: Number, required: true },
  wordsTyped:   { type: Number, required: true },
  passed:       { type: Boolean, required: true },
  passageUsed:  { type: String, required: true },
  submittedAt:  { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model("Result", resultSchema);
