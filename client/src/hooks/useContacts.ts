import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { ContactData, ContactQueryParams } from '../types/Contact';

const API_URL = process.env.REACT_APP_API_URL;

export default function useContacts() {
  const [isLoading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');

  const fetchContacts = async ({ page, customerDateRange = [] }: ContactQueryParams): Promise<ContactData> => {
    setLoading(true);
    try {
      let url = `${API_URL}contacts/list?page=${page}`;
      if (customerDateRange.length === 2) {
        url += `&start_customer_date=${customerDateRange[0]}&end_customer_date=${customerDateRange[1]}`;
      }
      const res = await axios.get(url, {
        headers: {
          'Access-Token': accessToken,
          'Content-Type': 'application/json',
        }
      });
      setLoading(false);
      return res.data.data;
    } catch (err) {
      setLoading(false);
      return {
        contacts: [],
        total: 0,
        total_pages: 0,
      };
    }
  };

  return { fetchContacts, isLoading };
};
