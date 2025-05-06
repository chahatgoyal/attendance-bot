// cron.js (CommonJS-compatible)
const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// List of trainees
const trainees = [
    { name: "Chahat", phone: "+919653697152" }
  ];
  

// Loop and send interactive button message
async function sendInteractiveMessages() {
  for (const trainee of trainees) {
    try {
      await client.messages.create({
        from: process.env.TWILIO_FROM_WHATSAPP,
        to: trainee.phone,
        contentSid: '', // Not needed unless you're using a template
        persistentAction: [],
        content: {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: trainee.phone,
          type: 'interactive',
          interactive: {
            type: 'button',
            body: {
              text: `Hi ${trainee.name}! Are you attending tomorrow’s 7:30 AM badminton session?`
            },
            action: {
              buttons: [
                {
                  type: 'reply',
                  reply: {
                    id: 'yes_attending',
                    title: '✅ Yes'
                  }
                },
                {
                  type: 'reply',
                  reply: {
                    id: 'no_attending',
                    title: '❌ No'
                  }
                }
              ]
            }
          }
        }
      });

      console.log(`✅ Sent interactive prompt to ${trainee.name}`);
    } catch (err) {
      console.error(`❌ Error sending to ${trainee.name}:`, err.message);
    }
  }
}

sendInteractiveMessages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("🔥 Error:", err.message);
    process.exit(1);
  });
