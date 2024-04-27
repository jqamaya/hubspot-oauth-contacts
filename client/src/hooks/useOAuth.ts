import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default function useOAuth() {

  const getAuthUrl = async () => {
    try {
      const res = await axios.get(`${API_URL}oauth/authorize`);
      return res.data.auth_url;
    } catch (err) {
      return '';
    }
  };

  return { getAuthUrl };
};
