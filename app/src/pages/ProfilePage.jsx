import React, { useContext, useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import events from '/images/events.jpg';
import Button from '@mui/material/Button';
import axios from 'axios'
import MyContext from '../MyContext';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'


const ProfilePage = () => {
    const [error, setError] = useState(false);
    const [info, setinfo] = useState([])
    const { userId } = useContext(MyContext)
    const [isAuth, setIsAuth] = useState(false)
    // console.log(id)


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`https://myblogs-api.vercel.app/user/singleuser/${userId}`);
                setinfo(res.data);
                setIsAuth(!Cookie.get('token'));
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [userId]);




    return (
        <Container maxWidth='xl'>
            {
                isAuth ? <h1 className='text-center my-5'>Login or register to view profile</h1> : <div className="row" style={{ marginBlock: '150px' }}>
                    <h1 className="text-center text-muted my-5">Profile of {info.name}</h1>
                    <div className="col-md-6">
                        <div className="image">
                            <img src={`http://localhost:4000/uploads/${info.picturePath}`} alt="" id='img' />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="user-details">
                            <div className="part">
                                <h1>Name : </h1>
                                <p className="text-muted name">{info.name}</p>
                            </div>
                            <div className="part">
                                <h1>Email : </h1>
                                <p className="text-muted name">{info.email}</p>
                            </div>
                            <div className="part">
                                <h1>Role : </h1>
                                <p className="text-muted name">{info.role}</p>
                            </div>
                            <div className="part">
                                <Button variant="contained" component={Link} to={`/updateuser/${userId}`} className='text-white'>
                                    Update User Details
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Container>
    )
}

export default ProfilePage
