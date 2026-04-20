const Result = require("../models/Result");
const { sendResultEmail } = require("../config/mailer");

const submitResult = async (req, res) => {
  try {
    const { name, email, wpm, accuracy, correctWords, errors, wordsTyped, passed, passageUsed } = req.body;
    if (!name || !email || wpm === undefined)
      return res.status(400).json({ message: "Missing required fields." });
    const result = await Result.create({ name, email, wpm, accuracy, correctWords, errors, wordsTyped, passed, passageUsed });
    await sendResultEmail({ name, email, wpm, accuracy, correctWords, errors, wordsTyped, passed });
    return res.status(201).json({ message: "Result submitted successfully.", id: result._id });
  } catch (err) {
    console.error("Submit error:", err);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

const getAllResults = async (_req, res) => {
  try {
    const results = await Result.find().sort({ submittedAt: -1 });
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = { submitResult, getAllResults };
