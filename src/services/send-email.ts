import dotenv from "dotenv";
import nodemailer from "nodemailer"

// Load environment variables
dotenv.config();

// Get parameters from CLI arguments
const recipient = process.argv[2];
const subject =  process.argv[3];
const message =  process.argv[4];

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
            to: recipient || process.env.EMAIL_RECP || process.env.EMAIL_RECP_DEFAULT,
            subject: subject || process.env.SUBJECT || "GitHub Actions - Automated Email (TypeScript)",
            text: message || process.env.MESSAGE || "Hello! This email was sent using GitHub Actions and Nodemailer with TypeScript.",
        };

        console.log(mailOptions);

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error);
        process.exit(1); // Exit with an error code
    }
};
