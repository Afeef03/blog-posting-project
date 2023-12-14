import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigateTo = useNavigate();

    const logoutUser = async (e) => {
        e.preventDefault();
        try {
            // await axios.post('http://localhost:4000/logout'); // Correct endpoint for logout
            Cookie.remove('token'); // Remove the 'token' cookie on the client side
            console.log('logged out')
            console.log(Cookie.get('token')) // Remove the 'token' cookie on the client side
            navigateTo('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxWidth='xl'>
            <div className="logout">
                <Button variant="contained" onClick={logoutUser}>
                    Logout
                </Button>
            </div>
        </Container>
    );
};

export default Logout;
