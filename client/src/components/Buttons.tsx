import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type CustomPageButtonProps = ButtonProps & {
  selected: boolean;
  isLast: boolean;
};

type YearButtonProps = ButtonProps & {
  selected: boolean;
  isLast: boolean;
}

export const PageButton = styled(Button, {
  shouldForwardProp: (prop) => !['selected', 'isLast'].includes(prop)
})<CustomPageButtonProps>(({ selected, isLast, theme }) => ({
  '&.MuiButton-root': {
    borderRadius: theme.spacing(1),
  },
  backgroundColor: selected ? '#F9FAFB' : theme.palette.common.white,
  color: selected ? theme.palette.text.primary : '#5C6578',
  minWidth: 40,
  minHeight: 40,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '20px',
  display: 'flex',
  marginRight: isLast ? 0 : '2px',
}));

export const PaginationButton = styled((props: ButtonProps) => (
  <Button {...props} />
))(({ theme }) => ({
  '&.MuiButton-root': {
    borderRadius: 4,
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: '8px 14px',
  },
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.text.primary,
  marginLeft: '8px',
}));

export const DropdownButton = styled((props: ButtonProps) => (
  <Button {...props} />
))(({ theme }) => ({
  '&.MuiButton-root': {
    borderRadius: 8,
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  width: 200,
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.grey[500],
  marginLeft: '8px',
}));

export const PrimaryButton = styled((props: ButtonProps) => (
  <Button color="primary" {...props} />
))(({ theme }) => ({
  '&.MuiButton-root': {
    borderRadius: 8,
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  marginLeft: '12px',
  minWidth: 74,
  height: 40,
}));

export const SecondaryButton = styled((props: ButtonProps) => (
  <Button color="secondary" {...props} />
))(({ theme }) => ({
  '&.MuiButton-root': {
    borderRadius: 8,
    border: '1px solid #7F56D9',
  },
  marginLeft: '12px',
  minWidth: 72,
  height: 40,
}));

export const TertiaryOutlinedButton = styled((props: ButtonProps) => (
  <Button variant="outlined" {...props} />
))(({ theme }) => ({
  '&.MuiButton-root': {
    borderRadius: 8,
    border: '1px solid #D0D5DD',
  },
  color: '#344054',
  minWidth: 80,
  height: 40,
}));

export const YearButton = styled(Button, {
  shouldForwardProp: (prop) => !['selected', 'isLast'].includes(prop)
})<YearButtonProps>(({ selected, isLast, theme }) => ({
  '&.MuiButton-root': {
    borderRadius: theme.spacing(0.75),
    backgroundColor: selected ? '#8390D6' : theme.palette.common.white,
    color: selected ? theme.palette.common.white : theme.palette.text.primary,
    justifyContent: 'start',
  },
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.palette.grey[200]
  },
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '20px',
  width: 160,
  marginBottom: 0.5,
  borderRadius: '6px',
}));
