import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowIcon from "../icons/ArrowIcon";


const MainButton = ({ children, onClick }: any) => {

  const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 400,
    borderRadius: 25,
    padding: '15px 60px',
    lineHeight: 1,
    width: '300px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  }));


  return (
    <CustomButton onClick={() => onClick()}>
      {children}
      <ArrowIcon height="14px" width="15px" ></ArrowIcon>
    </CustomButton>
  )
}
export default MainButton;


