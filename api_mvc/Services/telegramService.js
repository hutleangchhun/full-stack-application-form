import axios from 'axios';

export const sendTelegramMessage = async ({ name, email, message }) => {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    return axios.post(url, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `📬 New message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
};
