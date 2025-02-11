import express from 'express';
import { Redis } from '@upstash/redis';
import * as dotenv from 'dotenv';
import { upstashConfig } from '../configs/upstash.config';
import axios from 'axios';
import cron from 'node-cron';
import nodemailer from 'nodemailer';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

const redis = new Redis({
  url: upstashConfig.redisUrl,
  token: upstashConfig.redisToken,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/reminders', async (req, res) => {
  const { userId, reminderTime, message } = req.body;

  try {
    const reminderId = `reminder:${userId}:${Date.now()}`;
    const reminderTimestamp = new Date(reminderTime).getTime();

    await redis.zadd('reminders', { score: reminderTimestamp, member: JSON.stringify({ reminderId, userId, message }) });

    res.status(201).json({ message: 'Reminder scheduled successfully', reminderId });
  } catch (error) {
    console.error('Error scheduling reminder:', error);
    res.status(500).json({ message: 'Failed to schedule reminder' });
  }
});

async function checkAndSendReminders() {
  try {
    // const now = Date.now();

    // const reminders = await redis.zrangebyscore('reminders', 0, now);

    // for (const reminderString of reminders) {
    //   const reminder = JSON.parse(reminderString as string);

    //   await sendReminder(reminder.userId, reminder.message);

    //   await redis.zrem('reminders', reminderString);
    // }
  } catch (error) {
    console.error('Error checking and sending reminders:', error);
  }
}

async function sendReminder(userId: string, message: string) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'recipient@example.com', // Replace with the user's actual email address
      subject: 'Reminder!',
      text: `Reminder for user ${userId}: ${message}`,
      html: `<p>Reminder for user ${userId}: ${message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

cron.schedule('* * * * *', checkAndSendReminders);

app.listen(port, () => {
  console.log(`Reminder Service listening on port ${port}`);
});
