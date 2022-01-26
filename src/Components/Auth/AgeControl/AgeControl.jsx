import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function AgeControl() {


    const [open, setOpen] = React.useState(true);

    const navigate = useNavigate()

    const handleCloseAgeControl = () => {
        setOpen(false)
        navigate('/')
    }

    const [isAdult, setIsAdult] = React.useState(false);

    function checkIsAdult (action) {

          if(action) {
              setIsAdult (true)
            //    console.log('++++++++++');
          } else {
              setIsAdult (false)
          }
          handleCloseAgeControl()
      }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseAgeControl}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{textAlign: 'center'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Вам уже есть 18 лет?
          </Typography>
          <Button onClick={checkIsAdult}>Да</Button>          
          <Button onClick={handleCloseAgeControl}>Нет</Button>
        </Box>
      </Modal>
        {/* <ProductCard
            isAdult ={isAdult}
            checkIsAdult={checkIsAdult}
        /> */}
    </div>
  );
}
