import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowIcon from "../icons/ArrowIcon";
import { useNavigate } from "react-router-dom";

const BackButton = ({ children }: any) => {

  const navigate = useNavigate();
  const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    boxShadow: 'none',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: theme.palette.primary.main,
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

  return (
    <CustomButton variant="outlined" color="primary" onClick={() => navigate('..', { relative: 'path' })}>
      <ArrowIcon height="14px" width="15px" isLeft='true'></ArrowIcon>
      {children}
    </CustomButton>
  );

}

export default BackButton;