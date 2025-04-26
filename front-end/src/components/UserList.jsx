import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../assets/Icons/icons';
import { fetchAllUser, deleteUser } from '../services/api';
import ConfirmAlert from './confirmAlert';
import Loading from './Loading';
import Pagination from './Pagination';
import { useTranslation } from "react-i18next";
import ErrorMessage from './ErrorMessage';


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const { t } = useTranslation();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6; // Number of users per page

    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const userData = await fetchAllUser();
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const goToCreateUserForm = () => {
        navigate('/create-user');
    };

    const goToUpdateUserForm = (userId) => {
        navigate(`/update-user/${userId}`);
    };

    const handleDelete = async () => {
        try {
            if (userToDelete) {
                await deleteUser(userToDelete.id); // Call the API to delete the user
                setUsers(users.filter(user => user.id !== userToDelete.id)); // Remove the user from the list
                setShowConfirmDelete(false); // Close the confirmation alert
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user');
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmDelete(false);
        setUserToDelete(null);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error}/>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center my-5 ">
                <h1 className="text-2xl font-medium">{t("list_user")}</h1>
                <button
                    onClick={goToCreateUserForm}
                    className="rounded-full bg-blue-500 hover:bg-blue-700 ease-in-out duration-500 text-white p-3">
                    <Icon name="add" className="text-white text-xl" />
                </button>
            </div>

            <ul className="space-y-4">
                {currentUsers.map((user) => (
                    <li key={user.id} className="p-4 border rounded-md flex justify-between items-start">
                        <div>
                            <p>{t("name")}: {user.name}</p>
                            <p>{t("email")}: {user.email}</p>
                            <p>{t("age")}: {user.age}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => goToUpdateUserForm(user.id)}
                                className="text-blue-500 hover:text-blue-700">
                                <Icon name="update" className="text-blue-500 text-lg hover:text-black ease-in-out duration-500" />
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirmDelete(true);
                                    setUserToDelete(user);
                                }}
                                className="text-red-500 hover:text-red-700">
                                <Icon name="delete" className="text-red-500 text-xl hover:text-black ease-in-out duration-500" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination Component */}
            <Pagination
                totalUsers={users.length}
                usersPerPage={usersPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            {showConfirmDelete && (
                <ConfirmAlert
                    message={`Are you sure you want to delete ${userToDelete?.name}?`}
                    type="warning"
                    onConfirm={handleDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default UserList;
