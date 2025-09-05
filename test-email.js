import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
console.log('Mailtrap Token:', TOKEN ? 'Present' : 'Missing');

const Emailclient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

async function testEmail() {
  try {
    console.log('Testing email sending...');
    const response = await Emailclient.send({
      from: sender,
      to: [{ email: "test@example.com" }],
      subject: "Test Email",
      html: "<h1>Test Email</h1><p>This is a test email.</p>",
      category: "Test"
    });
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Email sending failed:', error.message);
    console.error('Full error:', error);
  }
}

testEmail();
