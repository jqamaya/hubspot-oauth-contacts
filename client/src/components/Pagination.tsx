import React from "react";
import { Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { PageButton, PaginationButton } from "./Buttons";

type Props = {
  pageNumbers: number[];
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({ pageNumbers, currentPage, handlePageChange }: Props) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px={3}
      py={2}
    >
      <PaginationButton
        variant="outlined"
        startIcon={
          <ArrowBackIcon
            sx={{ color: currentPage === 1 ? 'text.disabled' : 'text.primary' }}
          />
        }
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PaginationButton>
      <Box display="flex">
        {pageNumbers.map((_, i) => (
          <PageButton
            key={i + 1}
            selected={currentPage === i + 1}
            isLast={i === pageNumbers.length - 1}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </Box>
      <PaginationButton
        variant="outlined"
        endIcon={
          <ArrowForwardIcon
            sx={{ color: currentPage === pageNumbers.length ? 'text.disabled' : 'text.primary' }}
          />
        }
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </PaginationButton>
    </Box>
  );
};
