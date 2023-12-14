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

const ForgetPassword = () => {
  const [otp, setOtp] = useState('');
  const [auth, setAuth] = useState(false);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { userId } = useContext(MyContext);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/user/singleuser/${userId}`);
      setInfo(res.data);
      if (!Cookie.get('token')) {
        setAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Include an empty dependency array to run the effect only once

  const sendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/user/sendotp/${userId}`);
      setLoading(false);
      console.log(res.data);
      toast.success(`OTP sent to email: ${info.email}`);
    } catch (error) {
      setLoading(false);
      setError('Failed to send OTP. Please try again.');
    }
  };
  

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:4000/user/verifyotp/${userId}`, { otp });
      setLoading(false);
      console.log(res)
      toast.success('OTP verified successfully. You can now reset your password.');
      // Redirect to the password reset page or perform other actions
      navigate('/reset-password');
    } catch (error) {
      setLoading(false);
      setError('Invalid OTP. Please enter a valid OTP.');
    }
  };

  return (
    <div>
      <Container maxWidth='lg'>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '80vh' }}>
          <form>
            <h1 className='text-center'>The OTP will be sent to your email: {auth ? "please login first" : info.email}</h1>
            <h4 className='text-center text-muted'>Please click the "Send OTP" button first, then enter the OTP and click the "Verify OTP" button</h4>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder="Enter OTP...." style={{ marginTop: '40px' }} />
            <Button type="button" variant="contained" onClick={sendOtp} disabled={loading}>
              Send OTP
            </Button>
            <Button type="button" variant="contained" onClick={verifyOtp} disabled={loading}>
              Verify OTP
            </Button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </Box>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default ForgetPassword;
