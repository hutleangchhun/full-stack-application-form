import { insertMessage } from '../models/messageModel.js';
import { sendEmail } from '../Services/emailService.js';
import { sendTelegramMessage } from '../Services/telegramService.js';

export const handleMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        insertMessage(name, email, message, async (err, result) => {
            if (err) return res.status(500).json({ success: false, error: 'Database Error' });

            await sendTelegramMessage({ name, email, message });
            await sendEmail({ name, email, message });

            res.status(200).json({ success: true, message: 'Data sent successfully!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
};
