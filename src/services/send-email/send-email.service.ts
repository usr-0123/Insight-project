import dotenv from "dotenv";
import nodemailer from "nodemailer"
import {logger} from "../../utilis/logger";
import {DateFormatter} from "../../utilis/date-time";

// Load environment variables
dotenv.config();

// Date formatting class
const formatter = new DateFormatter(new Date());

// Function to send an email
export const sendEmailService = async (): Promise<any> => {
    try {
        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const defaultTemplate = (name: string, time: string, companyName: string): string => {

            return `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Email Templates by Luwi</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                            }
                            .container { 
                                width: 100vw;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #333333;
                            }
                            p {
                                color: #555555;
                            }
                            .footer {
                                margin-top: 20px;
                                font-size: 12px;
                                color: #999999;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Welcome to Our Service!</h1>
                            <p>Dear ${name},</p>
                            <p>Thank you for registering with us. Your account has been successfully created at ${time}.</p>
                            <p>You can now log in and start using our services.</p>
                            <p>If you have any questions, feel free to reply to this email.</p>
                            <p>Best regards,</p>
                            <p>The ${companyName} Team</p>
                            <div class="footer">
                                <p>&copy; 2024 ${companyName}. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                </html>
            `;
        }

        // Email details
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECP || process.env.EMAIL_RECP_DEFAULT,
            subject: process.env.SUBJECT || "GitHub Actions - Automated Email (TypeScript)",
            html: defaultTemplate("Default Name", formatter.format(), 'Luwi Team'),
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        logger.info(`✅ Email sent successfully! : ${info.messageId}`);
        return info;
    } catch (error:any) {
        logger.error(`❌ Error sending email: ${error.message}`);
        return error;
        // process.exit(1);
    }
};
