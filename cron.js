require('dotenv').config();
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Sample trainees list – replace with your actual list
const trainees = [
    { name: "Chahat", phone: "+919653697152" },
    { name: "Laxmi", phone: "+919731043868" },
    { name: "Birdie", phone: "+919980208172" },
    { name: "Punith", phone: "+919445579585" }
  ];
  

async function sendMessages() {
  for (const trainee of trainees) {
    try {
      console.log(`➡️ Sending message to ${trainee.name}`);
      const message = await client.messages.create({
        body: `Hi ${trainee.name}! Are you attending today's badminton session? Reply YES or NO.`,
        from: process.env.TWILIO_FROM_WHATSAPP,
        to: `whatsapp:${trainee.phone}`
      });
      console.log(`✅ Sent to ${trainee.name}: ${message.sid}`);
    } catch (err) {
      console.error(`❌ Failed for ${trainee.name}:`, err.message);
      throw new Error(`Failed to send message to ${trainee.name}`);
    }
  }
}

sendMessages()
  .then(() => {
    console.log("🎉 All messages sent successfully.");
    process.exit(0); // Exit gracefully
  })
  .catch((err) => {
    console.error("🔥 Error in sending messages:", err.message);
    process.exit(1); // Exit with failure code
  });

