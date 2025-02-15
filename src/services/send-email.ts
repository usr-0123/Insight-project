import dotenv from "dotenv";
import nodemailer from "nodemailer"
import { logger } from "../utilis/logger";

// Load environment variables
dotenv.config();

// Function to send an email
export const sendEmail = async (): Promise<void> => {
    try {
        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email details
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECP || process.env.EMAIL_RECP_DEFAULT,
            subject: process.env.SUBJECT || "GitHub Actions - Automated Email (TypeScript)",
            text: process.env.MESSAGE || "Hello! This email was sent using GitHub Actions and Nodemailer with TypeScript.",
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        logger.info(`✅ Email sent successfully! : ${info.messageId}`);
    } catch (error:any) {
        logger.error(`❌ Error sending email: ${error.message}`);
        process.exit(1);
    }
};
