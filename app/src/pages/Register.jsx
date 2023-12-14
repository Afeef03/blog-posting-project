import React, { useState, useContext } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from '../components/Error';
import Loader from '../components/Loader';
import MyContext from '../MyContext';



const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(MyContext);
  const { setUserId } = useContext(MyContext);

  const data = new FormData();

  const register = async (e) => {
    e.preventDefault();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('file', file[0]);

    try {
      setLoader(true);

      // Perform registration
      const response = await axios.post('http://localhost:4000/user/register', data, { withCredentials: true });

      // Check if the response contains the user data and _id
    if (response.data && response.data._id) {
      // If registration is successful, set the user and id
      setUser(response.data.name);
      setUserId(response.data._id.toString());

      toast.success('User created successfully', {
        theme: 'dark',
      });
    } else {
      // Handle the case where the response doesn't contain the expected data
      toast.error('Error registering user. Please try again.');
    }

      setLoader(false);
      setName('');
      setEmail('');
      setPassword('');
      setFile('');
    } catch (error) {
      setError(true);
      setLoader(false);
      console.log(error);
      // Handle error, show user-friendly message, etc.
    }
  };

  if (error) {
    return <Error />;
  }

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <section className="form">
          <Container maxWidth="xl">
            <form onSubmit={register}>
              <h1 className="text-center my-5 text-muted">Register or Create a user</h1>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
              <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

              <label htmlFor="pic" className="label">
                Profile pic
              </label>
              <input type="file" placeholder="Choose profile picture" onChange={(e) => setFile(e.target.files)} />
              <Button type="submit" variant="contained">
                Register
              </Button>

            </form>
          </Container>
        </section>
      )}
      <ToastContainer />
    </div>
  );
};

export default Register;
