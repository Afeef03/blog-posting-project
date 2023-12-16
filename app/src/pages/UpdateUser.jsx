import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from '../components/Error';
import Loader from '../components/Loader';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Link, useParams } from 'react-router-dom';
import Cookie from 'js-cookie'



const UpdateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false)


    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
    ];
    const data = new FormData();
    const { id } = useParams();


    const notify = async() => {
        toast.success('User updated successfully');
    }


    const updatePost = async (e) => {
        e.preventDefault()
        console.log(id)
        if(!Cookie.get('token')){
            toast.error('Login or register first', {
              theme: 'dark',
            });
            return;
          }
        data.append('name', name)
        data.append('email', email)
        data.append('file', file[0])

        try {
            // Your post creation logic goes here
            setLoader(true)
            const res = await axios.put(`https://myblogs-api.vercel.app/user/updateuser/${id}`, data, { withCredentials: true }).then(() => {
                notify()
            }).catch((error) => {
                toast.error(error.response.data.message, {
                    theme: 'dark',
                  });
            })
            console.log('About to show toast message'); // Log a message
            
            console.log(res)
            setName('');
            setEmail('')
            setLoader(false)
        } catch (error) {
            setError(true)
            console.error('Error Updating user:', error);
            setLoader(false)
            toast.error('Login or register first', {
                theme: 'dark',
              });
            // Handle error, show user-friendly message, etc.
        }
    };


    if (error) {
        return <Error />
    }
 

    if (loader) {
        return <Loader />
    }

    return (
        <>
            {
                <section className="form">
                    <Container maxWidth="xl">
                        <form onSubmit={updatePost}>
                            <h1 className="text-center mt-5 text-muted">Update User</h1>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required/>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <input type="file" placeholder="Choose image" onChange={(e) => setFile(e.target.files)} />
                
                            <Button type="submit" variant="contained">
                                Update post
                            </Button>
                        </form>
                    </Container>
                        <ToastContainer />
                </section>
            }
        </>
    );
};

export default UpdateUser;
