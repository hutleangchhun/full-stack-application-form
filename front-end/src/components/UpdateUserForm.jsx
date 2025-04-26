// src/components/UpdateUserForm.js
import React, { useState, useEffect, useTransition } from 'react';
import { useParams } from 'react-router-dom';
import PopupAlert from './Alert'; // Import the PopupAlert component
import { fetchUserById, updateUser } from '../services/api'; // Import API functions
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const UpdateUserForm = () => {
    const { id } = useParams(); // Get user ID from the URL
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });
    const {t} = useTranslation();

    // Fetch user data when the component mounts
    const fetchUser = async () => {
        try {
            const userData = await fetchUserById(id);
            setUser(userData);
            setName(userData.name);
            setEmail(userData.email);
            setPassword(userData.password);
            setAge(userData.age);
        } catch (error) {
            console.error('Error fetching user:', error);
            setAlert({ message: 'Error fetching user data', type: 'error' });
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    // Handle form submission to update user
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser(id, { name, email, password, age });
            setAlert({ message: 'User updated successfully!', type: 'success' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setAlert({ message: 'Error updating user, please try again!', type: 'error' });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ message: '', type: '' }); // Clear the alert message
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className='min-h-screen flex justify-center items-center max-w-md mx-auto'>
            <PopupAlert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
            <form onSubmit={handleSubmit} className="space-y-4 p-5 border rounded-lg w-full mx-auto">
                <h5 className='text-center text-xl font-bold'>{t("update_user")}</h5>
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
                    {t("update")}
                </button>
            </form>
        </div>
    );
};

export default UpdateUserForm;
