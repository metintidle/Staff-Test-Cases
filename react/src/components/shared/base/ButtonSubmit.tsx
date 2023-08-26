import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const SubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
  boxShadow: 'none',
  border: '2px solid',
  borderColor: theme.palette.primary.main,
  fontFamily: 'Roboto',
  fontWeight: 700,
  color: theme.palette.text.primary,
  borderRadius: 25,
  padding: '15px 60px',
  lineHeight: '1em',
  width: '300px',
  '&:hover': {
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));


export default SubmitButton;