export type Contact = {
  email: string;
  first_name: string;
  last_name: string;
  customer_date: string;
  lead_date: string;
};

export type ContactData = {
  contacts: Contact[];
  total: number;
  total_pages: number;
  error?: string;
};

export type ContactQueryParams = {
  page: number;
  customerDateRange?: number[];
};
