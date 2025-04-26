import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const MessageForm = () => {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState({ success: null, message: '' });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ success: false, message: 'All fields are required.' });
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/api/message/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ success: true, message: data.message });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ success: false, message: data.error || 'Something went wrong.' });
            }
        } catch (error) {
            setStatus({ success: false, message: 'Server error. Please try again later.' });
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
            {status.message && (
                <div className={`mb-4 text-sm ${status.success ? 'text-green-600' : 'text-red-600'}`}>
                    {status.message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder={t("name")}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder={t("email")}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="message"
                    placeholder={t("message")}
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {t("send")}
                </button>
            </form>
        </div>
    );
};

export default MessageForm;
