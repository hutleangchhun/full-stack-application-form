import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

const handleAxiosError = (error, fallbackMessage) => {
    if (error.response) {
        // Server responded with a status code outside 2xx
        const status = error.response.status;
        const message = error.response.data?.message || fallbackMessage;

        if (status === 404) return `${fallbackMessage} — Not found (404)`;
        if (status === 500) return `${fallbackMessage} — Server error (500)`;
        if (status === 403) return `${fallbackMessage} — Unauthorized (403)`;

        return `${fallbackMessage} — (${status}) ${message}`;
    } else if (error.request) {
        // Request was made but no response
        return 'No response from server. Please check your network connection.';
    } else {
        // Something happened in setting up the request
        return `Request error: ${error.message}`;
    }
};

// Fetch all users
export const fetchAllUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        return response.data.users;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch users'));
    }
};

// Fetch user by ID
export const fetchUserById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/show?id=${id}`);
        return response.data.user;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to fetch user'));
    }
};

// Update user
export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update?id=${id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to update user'));
    }
};

// Delete user
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete?id=${id}`);
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, 'Failed to delete user'));
    }
};
