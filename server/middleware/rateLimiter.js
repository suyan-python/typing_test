const rateLimit = require("express-rate-limit");
const globalLimiter = rateLimit({ windowMs: 15*60*1000, max: 100, standardHeaders: true, legacyHeaders: false });
const submitLimiter = rateLimit({
  windowMs: 10*60*1000, max: 5, standardHeaders: true, legacyHeaders: false,
  message: { message: "Too many submissions. Please wait before trying again." },
});
module.exports = { globalLimiter, submitLimiter };
