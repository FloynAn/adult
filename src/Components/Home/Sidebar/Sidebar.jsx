import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductsContext';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flexGrow: 1
  };


const Sidebar = () => {
    const search = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const {getProducts} = useContext(productContext)
    const [type, setType] = useState(search.get('type') || '')
    const [price, setPrice] = useState(search.get('price_lte') || '')
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const filterProducts = (key, value) => {
        search.set(key, value)
        let newPath = `${window.location.pathname}?${search.toString()}`
        navigate(newPath)
        setType(search.get('type') || '')
        setPrice(search.get('price_lte' || ''))
        getProducts()
    }

    const handleChangeType = (e, value) => { 
        if(value === 'all'){ 
            search.delete('type')
            let newPath = `${window.location.pathname}?${search.toString()}`
            navigate(newPath) 
            setType(value) 
            getProducts()
            return 
        } 
        search.set(e,value)
        let newPath = `${window.location.pathname}?${search.toString()}` 
        navigate(newPath) 
        setType(search.get("type") || '') 
        getProducts() 
    }


    const resetFilter = () => {
        navigate('/')
        setType('')
        setPrice('')
        getProducts()
    }

    return (
        <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <Paper elevation={2}>
                        <FormControl component='fieldset'>
                            <FormLabel component='legend'>Type</FormLabel>
                            <RadioGroup 
                                aria-label='gender' 
                                name='gender1' 
                                value={type}
                                onChange={(e)=>handleChangeType('type', e.target.value)}
                            >
                                <FormControlLabel 
                                    value='apple' 
                                    control={<Radio/>} 
                                    label="Apple"
                                />
                                <FormControlLabel
                                     value='samsung' 
                                     control={<Radio/>} 
                                     label="Samsung"
                                 />
                                <FormControlLabel
                                     value='all' 
                                     control={<Radio/>} 
                                     label="All"
                                 />
                            </RadioGroup>
                        </FormControl>
                        <Grid>
                            <Slider
                            onChange={(e) => filterProducts
                            ('price_lte', e.target.value)}
                            valueLabelDisplay='auto'
                            max={30000}
                            step={100}
                           
                            />
                        </Grid>
                        <Button 
                            onClick={resetFilter} 
                            variant='contained' 
                            color='secondary'
                        >
                            Сбросить
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        </Modal>
        </div>
    );
};

export default Sidebar;