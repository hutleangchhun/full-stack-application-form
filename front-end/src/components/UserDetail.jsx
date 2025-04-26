import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from './UpdateUserForm';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/show?id=${id}`);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8080/api/users/delete?id=${id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">User Details</h1>
            <div className="space-y-4">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Age: {user.age}</p>

                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                    Delete User
                </button>

                <UserForm user={user} onSubmit={() => fetchUser()} />
            </div>
        </div>
    );
};

export default UserDetail;
