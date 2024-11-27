import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // adjust to your Laravel backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export const roleService = {
    // Get all roles
    getRoles: async () => {
        try {
            const response = await api.get('/roles');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get single role
    getRole: async (id) => {
        try {
            const response = await api.get(`/roles/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create role
    createRole: async (roleData) => {
        try {
            const response = await api.post('/roles', roleData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update role
    updateRole: async (id, roleData) => {
        try {
            const response = await api.put(`/roles/${id}`, roleData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete role
    deleteRole: async (id) => {
        try {
            const response = await api.delete(`/roles/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

};