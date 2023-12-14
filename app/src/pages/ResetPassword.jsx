import React, { useContext, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from 'js-cookie';
import MyContext from '../MyContext';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { userId } = useContext(MyContext);
    // console.log(userId);


    const updatePassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:4000/user/verifypassword/${userId}`, { newPassword });
            setLoading(false);
            toast.success("password updated successfully");
            setNewPassword('')
        } catch (error) {
            setLoading(false);
            setError('Failed to update password. Please try again.');
        }
    };

    return (
        <div>
            <Container maxWidth='lg'>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '80vh' }}>
                    <form>
                        <h1 className='text-center'>Update Password</h1>
                        <input
                            type="password"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ marginTop: '20px' }}
                        />
                        <Button type="button" variant="contained" onClick={updatePassword} disabled={loading}>
                            Update Password
                        </Button>
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </Box>
                <ToastContainer />
            </Container>
        </div>
    );
};

export default ResetPassword;
