import { Grid } from '@mui/material';
import React from 'react';
import AgeControl from '../Auth/AgeControl/AgeControl';
import Content from './Content/Content';
import Sidebar from './Sidebar/Sidebar';
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




const Home = () => {

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

            <Grid spacing-md={3} spacing-sm={3}>
                {isAdult ?  (<><Sidebar/><Content/></>) : (<h1 style={{textAlign: 'center', color: 'purple'}}>Только для лиц, достигших 18 лет</h1>)
                }
            </Grid>
            
        </div>
    );
};

export default Home;