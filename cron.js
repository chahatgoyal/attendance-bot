// // cron.js (CommonJS-compatible)
// const twilio = require('twilio');
// const dotenv = require('dotenv');

// dotenv.config();

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // List of trainees
// const trainees = [
//     { name: "Chahat", phone: "whats+919653697152" }
//   ];
  

// // Loop and send interactive button message
// async function sendInteractiveMessages() {
//   for (const trainee of trainees) {
//     try {
//       await client.messages.create({
//         from: process.env.TWILIO_FROM_WHATSAPP,
//         to: trainee.phone,
//         contentSid: '', // Not needed unless you're using a template
//         persistentAction: [],
//         content: {
//           messaging_product: 'whatsapp',
//           recipient_type: 'individual',
//           to: trainee.phone,
//           type: 'interactive',
//           interactive: {
//             type: 'button',
//             body: {
//               text: `Hi ${trainee.name}! Are you attending tomorrow’s 7:30 AM badminton session?`
//             },
//             action: {
//               buttons: [
//                 {
//                   type: 'reply',
//                   reply: {
//                     id: 'yes_attending',
//                     title: '✅ Yes'
//                   }
//                 },
//                 {
//                   type: 'reply',
//                   reply: {
//                     id: 'no_attending',
//                     title: '❌ No'
//                   }
//                 }
//               ]
//             }
//           }
//         }
//       });

//       console.log(`✅ Sent interactive prompt to ${trainee.name}`);
//     } catch (err) {
//       console.error(`❌ Error sending to ${trainee.name}:`, err.message);
//     }
//   }
// }

// sendInteractiveMessages()
//   .then(() => process.exit(0))
//   .catch(err => {
//     console.error("🔥 Error:", err.message);
//     process.exit(1);
//   });

const twilio = require("twilio");
const dotenv = require("dotenv");
const { getTrainees } = require("./utils/firebase-utils"); // Ensure this exports CommonJS
dotenv.config();

// Twilio client setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send attendance prompt
const sendAttendancePrompt = async () => {
  try {
    const trainees = await getTrainees();

    for (const trainee of trainees) {
      const messageBody = `Hi ${trainee.name}, will you attend badminton tomorrow at 7:30 AM? Reply with:
1️⃣ Yes
2️⃣ No`;

      const message = await client.messages.create({
        from: process.env.TWILIO_FROM_WHATSAPP,
        to: `whatsapp:${trainee.phone}`,
        body: messageBody
      });

      console.log(`✅ Message sent to ${trainee.name}: SID ${message.sid}`);
    }

    process.exit(0); // Gracefully exit after sending
  } catch (error) {
    console.error("❌ Error sending messages:", error.message);
    process.exit(1);
  }
};

sendAttendancePrompt()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("🔥 Error:", err.message);
    process.exit(1);
  });


