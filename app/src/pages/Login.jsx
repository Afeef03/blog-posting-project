import React, { useState , useContext, useEffect  } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from '../components/Error'
import Loader from '../components/Loader'
import { useNavigate , Link } from 'react-router-dom'
import MyContext from '../MyContext';




const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const navigateTo = useNavigate();
  const { setUser } = useContext(MyContext);
  const { setUserId } = useContext(MyContext);

 



  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/user/login', {
        email,
        password
      }, {
        withCredentials: true
      });
      
      setEmail('');
      setPassword('');
      setUser(res.data.user);  // Assuming your server sends the user data upon successful login
      setUserId(res.data._id)
      navigateTo('/');
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'dark',
      });
      console.log(error);
    }
  };
  

 

  return (
    <div>
      {
        loader ? <Loader /> : <section className="form">
          <Container maxWidth="xl">
            <form onSubmit={login}>
              <h1 className="text-center my-5 text-muted">Login</h1>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Provide your username for public display." required />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
              <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Link className='text-primary fw-bold' to='/forgetpassword'>Forget password?</Link>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </form>
          </Container>
      <ToastContainer />
        </section>
        
      }
    </div>
  )
}

export default Login
