import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TextInput = styled(TextField)(({ theme }) => ({
  maxWidth: 136,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    borderColor: '#D0D5DD',
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px',
  }
}));
