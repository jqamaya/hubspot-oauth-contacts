import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, LinearProgress, Typography } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { format, getTime } from 'date-fns';

import {
  Table,
  TableHeaderRow,
  TableHeader,
  TableData,
} from '../components/Table';
import { Contact } from '../types/Contact';
import useContacts from '../hooks/useContacts';
import {
  DropdownButton,
  PrimaryButton,
} from '../components/Buttons';
import DatePickerModal from '../components/DatePickerModal';
import useOAuth from '../hooks/useOAuth';
import Pagination from '../components/Pagination';

import "react-datepicker/dist/react-datepicker.css";
import '../App.css';

function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { fetchContacts, isLoading } = useContacts();
  const { getAuthUrl } = useOAuth();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageNumbers = useMemo(
    () => [...Array(totalPages)],
    [totalPages],
  );

  const fetch = useCallback(async (customerDateRange?: number[]) => {
    const data = await fetchContacts({ page, customerDateRange });
    setContacts(data?.contacts || []);
    setTotalPages(data?.total_pages || 0);
  }, [page, fetchContacts]);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlePageChange = useCallback((pageNumber: number) => {
    if (
      pageNumber > 0 &&
      pageNumber <= totalPages &&
      pageNumber !== page
    ) {
      setPage(pageNumber);
    }
  }, [page, totalPages]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateSelect = (dates: Date[]) => {
    const [start = new Date(), end = new Date()] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  const handleFilterByDate = useCallback(() => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    const startCustomerDate: number = getTime(start) / 1000;
    const endCustomerDate: number = getTime(end) / 1000;
    handleClose();
    fetch([startCustomerDate, endCustomerDate]);
  }, [startDate, endDate, fetch]);

  const handleConnect = async () => {
    const url = await getAuthUrl();
    window.open(url);
  };

  const formatTimestamp = (timestamp: string) => (
    format(new Date(parseInt(timestamp) * 1000), 'MM/dd/yyyy')
  );

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box py={2.5} px={3} display="flex">
        <Typography variant='h6' sx={{
          fontSize: '1.125rem',
          fontWeight: 600,
          flex: 1,
        }}>
          Data
        </Typography>
        <Box display="flex">
          <DropdownButton
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="outlined"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon sx={{ color: 'grey.400' }} />}
          >
            Customer Date
          </DropdownButton>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <DatePickerModal
              startDate={startDate}
              endDate={endDate}
              handleDateSelect={handleDateSelect}
              handleClose={handleClose}
              handleApply={handleFilterByDate}
            />
          </StyledMenu>
          <PrimaryButton variant="contained" onClick={handleConnect}>
            Connect
          </PrimaryButton>
        </Box>
      </Box>
      {isLoading
        ? <LinearProgress color="primary" />
        : contacts.length ? (
          <Table>
            <thead>
              <TableHeaderRow>
                <TableHeader>Email</TableHeader>
                <TableHeader>First Name</TableHeader>
                <TableHeader>Last Name</TableHeader>
                <TableHeader>Customer Date</TableHeader>
                <TableHeader>Lead Date</TableHeader>
              </TableHeaderRow>
            </thead>
            <tbody>
              {contacts.map((row, index) => (
                <tr key={index}>
                  <TableData>{row.email}</TableData>
                  <TableData>{row.first_name}</TableData>
                  <TableData>{row.last_name}</TableData>
                  <TableData>
                    {parseInt(row.customer_date) !== 0 
                      ? formatTimestamp(row.customer_date)
                      : '-'
                    }
                  </TableData>
                  <TableData>
                    {parseInt(row.lead_date) !== 0
                      ? formatTimestamp(row.lead_date)
                      : '-'
                    }
                  </TableData>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Typography variant='h6' textAlign="center">
              No contacts found. Please retry later.
            </Typography>
          </Box>
        )
      }
      {!!contacts.length && !isLoading && (
          <Pagination
            currentPage={page}
            pageNumbers={pageNumbers}
            handlePageChange={handlePageChange}
          />
        )}
    </Box>
  );
}

export default Contacts;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));