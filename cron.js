const cron = require("node-cron");
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const trainees = [
  { name: "Chahat", phone: "+919653697152" }
//   { name: "Laxmi", phone: "+91yyyyyyyyyy" },
//   { name: "Sameer", phone: "+91yyyyyyyyyy" }
];

cron.schedule("0 2 * * *", async () => {
  for (const trainee of trainees) {
    await client.messages.create({
      body: `Hi ${trainee.name}! Are you attending the badminton session today? Reply YES or NO.`,
      from: process.env.TWILIO_FROM_WHATSAPP,
      to: `whatsapp:${trainee.phone}`
    });
  }

  console.log("✅ Messages sent at 7:00 AM");
});

// Keep process alive
setInterval(() => {}, 1000);
