# Typing Test — Evolve Vue Pvt. Ltd.

Live at: `typingtest.evolvevue.com.np`

## Structure

```
typing-test/
├── client/                        # React + Vite + Tailwind
│   └── src/
│       ├── components/
│       │   ├── RegisterForm.jsx   # Name + email entry
│       │   ├── PassageDisplay.jsx # Color-coded typing display
│       │   ├── TimerBar.jsx       # Countdown with color warning
│       │   ├── LiveStats.jsx      # Live WPM + accuracy
│       │   └── ResultCard.jsx     # Results + submit to HR
│       ├── hooks/
│       │   └── useTypingTest.js   # All test logic (timer, scoring)
│       ├── pages/
│       │   ├── TypingTestPage.jsx # Main page with phase transitions
│       │   └── ThankYouPage.jsx   # Post-submit confirmation
│       └── utils/
│           └── sentences.js       # Passage pool + builder
└── server/                        # Express + MongoDB
    ├── config/
    │   ├── db.js                  # MongoDB connection
    │   └── mailer.js              # Nodemailer + HTML email template
    ├── controllers/
    │   └── resultController.js    # Submit + list results
    ├── middleware/
    │   └── rateLimiter.js         # 5 submits / 10 min per IP
    ├── models/
    │   └── Result.js              # Mongoose schema
    └── routes/
        └── resultRoutes.js        # POST /submit  GET /
```

## Quick start

```bash
# Server
cd server && npm install && cp .env.example .env
# Fill in .env, then:
npm run dev

# Client (separate terminal)
cd client && npm install && cp .env.example .env
npm run dev
```

## Environment variables

### server/.env
| Variable | Value |
|----------|-------|
| `MONGO_URI` | MongoDB Atlas URI |
| `SMTP_HOST` | smtp.gmail.com |
| `SMTP_PORT` | 587 |
| `SMTP_USER` | evolvevue25@gmail.com |
| `SMTP_PASS` | Gmail App Password (see below) |
| `HR_EMAIL_1` | hrevolvevue@gmail.com |
| `HR_EMAIL_2` | evolvevue25@gmail.com |
| `CLIENT_URL` | https://typingtest.evolvevue.com.np |

### client/.env
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | https://api.typingtest.evolvevue.com.np |

## Gmail App Password
1. myaccount.google.com → Security → 2-Step Verification → App Passwords
2. Generate for "Mail"
3. Paste into `SMTP_PASS`

## DNS setup for typingtest.evolvevue.com.np

In your registrar's DNS panel — no extra purchase needed, subdomains are free.

**Option A — Frontend on Vercel/Netlify + Backend on VPS:**
| Type | Host | Value |
|------|------|-------|
| CNAME | typingtest | your-app.vercel.app |
| A | api.typingtest | YOUR_VPS_IP |

**Option B — Everything on one VPS:**
| Type | Host | Value |
|------|------|-------|
| A | typingtest | YOUR_VPS_IP |

Then use Nginx to serve frontend on port 80 and proxy `/api` to port 5000.

## Deploy

```bash
# Build frontend
cd client && npm run build
# dist/ folder -> upload to Vercel / Netlify / Nginx /var/www

# Backend on VPS
cd server && npm install --production
# Use PM2: pm2 start index.js --name typing-test-api
```
# typing_test
