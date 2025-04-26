import React, { useState } from 'react';
import axios from 'axios';
import PopupAlert from './Alert'; // Import the PopupAlert component
import { useTranslation } from "react-i18next";

const CreateUserForm = ({ onSubmit = () => { } }) => {  // Default onSubmit to an empty function
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });
    const {t} = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create new user
            await axios.post('http://127.0.0.1:8080/api/users/create', {
                name,
                email,
                password,
                age,
            });
            setAlert({ message: 'User created successfully!', type: 'success' });
            onSubmit(); // Call onSubmit if provided (refresh user list or reset the form)
            // reset form function
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            setAlert({ message: 'Error creating user, please try again!', type: 'error' });
        }
    };
    // funtion to reset from
    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setAge('');
    };  

    const handleCloseAlert = () => {
        setAlert({ message: '', type: '' }); // Clear the alert message
    };

    return (
        <div className='min-h-screen flex justify-center items-center max-w-md mx-auto'>
            {/* Display the popup alert if there is a message */}
            <PopupAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
            
            <form onSubmit={handleSubmit} className="space-y-4 w-full p-5 mx-auto border rounded-lg">
                <h5 className='text-xl text-center font-bold'>{t("create_user")}</h5>
                <div>
                    <label>{t("name")}</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label>{t("email")}</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label>{t("password")}</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label>{t("age")}</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
                    {t("create")}
                </button>
            </form>
        </div>
    );
};

export default CreateUserForm;
