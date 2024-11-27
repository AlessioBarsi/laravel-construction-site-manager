import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
    headers: {
        'Content-Type': 'application/json'
    }
});

export const reportService = {
    // Get all Reports
    getReports: async () => {
        try {
            const response = await api.get('/reports');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get single Report
    getReport: async (id) => {
        try {
            const response = await api.get(`/reports/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create Report
    createReport: async (ReportData) => {
        try {
            const response = await api.post('/reports', ReportData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update Report
    updateReport: async (id, reportData) => {
        try {
            const response = await api.put(`/reports/${id}`, reportData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete Report
    deleteReport: async (id) => {
        try {
            const response = await api.delete(`/reports/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

};