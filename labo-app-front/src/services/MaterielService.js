import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getMateriels = async () => {
  try {
    const response = await axios.get(`${API_URL}/materiels`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des matériels", error);
    throw error;
  }
};

export const getMaterielById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/materiels/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du matériel", error);
    throw error;
  }
};