const express = require("express");
const router = express.Router();
const { submitResult, getAllResults } = require("../controllers/resultController");
const { submitLimiter } = require("../middleware/rateLimiter");
router.post("/submit", submitLimiter, submitResult);
router.get("/", getAllResults);
module.exports = router;
