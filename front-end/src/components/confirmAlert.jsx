import React from 'react';

const ConfirmAlert = ({ message, type, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl mb-4">{message}</h3>
                <div className="flex space-x-4">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-md">
                        Yes, Delete
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmAlert;
