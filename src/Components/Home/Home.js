import { Grid } from '@mui/material';
import React from 'react';
import AgeControl from '../Auth/AgeControl/AgeControl';
import Content from './Content/Content';
import Sidebar from './Sidebar/Sidebar';

const Home = () => {
    return (
        <div>
            <Grid spacing-md={3} spacing-sm={3}>
                <Sidebar/>
                {/* <AgeControl /> */}
                <Content/>
            </Grid>
            
        </div>
    );
};

export default Home;