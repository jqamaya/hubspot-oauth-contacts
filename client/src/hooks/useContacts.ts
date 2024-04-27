import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { useLocalStorage } from './useLocalStorage';
import { ContactData, ContactQueryParams } from '../types/Contact';

const API_URL = process.env.REACT_APP_API_URL;

export default function useContacts() {
  const [isLoading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useLocalStorage('access_token', '');

  useEffect(() => {
    setAccessToken(searchParams.get('access_token'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  console.log({accessToken});

  const fetchContacts = useCallback(async ({ page, customerDateRange = [] }: ContactQueryParams): Promise<ContactData> => {
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
  }, [accessToken]);

  return { fetchContacts, isLoading };
};
