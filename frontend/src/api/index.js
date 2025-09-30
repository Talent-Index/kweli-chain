import axios from 'axios';

const MB_BASE_URL = import.meta.env.VITE_MB_BASE_URL;
const MB_API_KEY = import.meta.env.VITE_MB_API_KEY;
const CONTRACT_ID = import.meta.env.VITE_CONTRACT_ID;

const api = axios.create({
  baseURL: MB_BASE_URL,
  headers: { 'x-api-key': MB_API_KEY }
});

// Verify certificate by hash
export const verifyCertificateHash = async (hash) => {
  const response = await api.get(`/contracts/${CONTRACT_ID}/certificates/${hash}`);
  return response.data;
};

// Verify certificate by file upload
export const verifyCertificateFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post(`/contracts/${CONTRACT_ID}/verify-file`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// Fetch certificates issued by institution
export const getIssuedCertificates = async () => {
  const response = await api.get(`/contracts/${CONTRACT_ID}/issued-certificates`);
  return response.data;
};

export default api;