import React, { useEffect } from 'react';

const PopupAlert = ({ message, type, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // Close after 5 seconds

            return () => clearTimeout(timer); // Clean up the timer if the component is unmounted
        }
    }, [message, onClose]);

    if (!message) return null;

    // Dynamically set the title based on the type of alert
    const getTitle = (type) => {
        switch (type) {
            case 'success':
                return 'Success';
            case 'error':
                return 'Error';
            case 'warning':
                return 'Warning';
            default:
                return 'Info';
        }
    };

    // Define alert colors based on type
    const modalStyles = type === 'success'
        ? 'bg-green-100 text-green-700 border-green-700'
        : type === 'error'
            ? 'bg-red-100 text-red-700 border-red-700'
            : type === 'warning'
                ? 'bg-yellow-100 text-yellow-700 border-yellow-700'
                : 'bg-blue-100 text-blue-700 border-blue-700';

    return (
        <div
            className="fixed bottom-0 right-0 z-50 flex items-center justify-end p-4"
            aria-live="assertive"
        >
            <div className={`border-l-8 rounded-lg shadow-lg ${modalStyles} max-w-sm w-full p-4 flex items-start justify-between gap-20 transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col">
                    <span className="font-bold text-md">{getTitle(type)}</span>
                    <p className="text-sm text-center">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-3xl font-bold hover:text-gray-300 focus:outline-none"
                    aria-label="Close alert"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default PopupAlert;
