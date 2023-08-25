import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useEffect, useState } from 'react';
import MainButton from "./ButtonMain";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

// type Props = { isOpen: boolean, width: number, children: ReactNode };
// { isOpen = false, width = 100, children }: any
export default function ErrorPopup({ isOpen = false, width = 100, children }: any) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent sx={{ display: 'flex', justifyContent: 'center', gap: 3, alignContent: 'center', flexDirection: 'column', alignItems: 'center', width: width }}>
        <ErrorOutlineOutlinedIcon color='error' fontSize='large'></ErrorOutlineOutlinedIcon>
        <DialogContentText textAlign={'center'}>
          {children}
        </DialogContentText>
        <MainButton onClick={handleClose} size='small' sx={{ width: 4 }}>Ok</MainButton>
      </DialogContent>
    </Dialog>
  )
}