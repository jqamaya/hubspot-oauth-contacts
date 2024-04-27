import { styled } from "@mui/material/styles";

export const Table = styled('table')(({ theme }) => ({
  borderCollapse: 'collapse',
}));

export const TableHeaderRow = styled("tr")(({ theme }) => ({
  color: '#5C6578',
  backgroundColor: '#F9FAFB',
  borderTop: '1px solid #EAECF0',
  borderBottom: '1px solid #EAECF0',
}));

export const TableHeader = styled("th")(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  textAlign: 'left',
}));

export const TableData = styled("td")(({ theme }) => ({
  borderBottom: '1px solid #EAECF0',
  fontSize: 14,
  lineHeight: '20px',
  color: theme.palette.text.primary,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  textAlign: 'left',
}));
