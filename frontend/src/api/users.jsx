import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // adjust to your Laravel backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export const userService = {
    // Get all users
    getUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get single user
    getUser: async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create user
    createUser: async (userData) => {
        try {
            const response = await api.post('/users', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Bulk site Update
    bulkUpdateSite: async (userData) => {
        try {
            const response = await api.put(`/users/bulk-site-update`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update user
    updateUser: async (id, userData) => {
        try {
            const response = await api.put(`/users/${id}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete user
    deleteUser: async (id) => {
        try {
            const response = await api.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    //Change Password
    changePassword: async (id, userData) => {
        try {
            const response = await api.put(`/users/change-password/${id}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

};