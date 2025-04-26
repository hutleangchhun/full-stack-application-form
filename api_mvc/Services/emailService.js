import nodemailer from 'nodemailer';

export const sendEmail = async ({ name, email, message }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  // Your Gmail email (e.g., "youremail@gmail.com")
            pass: process.env.EMAIL_PASS,  // Your Gmail app password
        },
    });

    // Send email to your Gmail (hutleangchhun@gmail.com) and the user's email (optional, for reply)
    try {
        const info = await transporter.sendMail({
            from: `"Notifier" <${process.env.EMAIL_USER}>`,  // Sender's email (your Gmail)
            to: process.env.EMAIL_USER,  // Send to your Gmail (e.g., hutleangchhun@gmail.com)
            replyTo: email,  // Reply to the user's email
            subject: 'New message received from the form',  // Subject of the email
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`,  // The message content
        });

        console.log('Email sent:', info);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
