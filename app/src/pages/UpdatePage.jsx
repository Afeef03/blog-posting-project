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



const UpdatePage = () => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false)
    const [post, setPost] = useState([])
    const [selectedValue, setSelectedValue] = useState('technology');

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/post/getsinglepost/${id}`);
                setPost(res.data);
                setTitle(res.data.title);
                setSummary(res.data.summary);
                setContent(res.data.content);
                setAuthor(res.data.author);
            } catch (error) {
                setError(true);
                console.error('Error Fetching post:', error);
                setLoader(false);
            }
        };

        fetchData();
    }, [id]);

    const notify = async() => {
        toast.success('post updated successfully');
    }


    const updatePost = async (e) => {
        e.preventDefault()
        if(!Cookie.get('token')){
            toast.error('Login or register first', {
              theme: 'dark',
            });
            return;
          }
        data.append('author', author)
        data.append('title', title)
        data.append('summary', summary)
        data.append('content', content)
        data.append('file', file[0])
        data.append('category', selectedValue);

        try {
            // Your post creation logic goes here
            setLoader(true)
            const res = await axios.put(`http://localhost:4000/post/updatepost/${id}`, data, { withCredentials: true })
            console.log('About to show toast message'); // Log a message
            notify()
            
            console.log(res)
            setSummary('');
            setContent('')
            setTitle('')
            setAuthor('')
            setLoader(false)
        } catch (error) {
            setError(true)
            console.error('Error creating post:', error);
            setLoader(false)
            // Handle error, show user-friendly message, etc.
        }
    };


    if (error) {
        return <Error />
    }
    const handleChange = (event) => {
        const targetted = event.target.value;
        console.log("Event:", targetted); // Log the event to see its structure
        setSelectedValue(event.currentTarget);
    };

    if (loader) {
        return <Loader />
    }

    return (
        <>
            {
                <section className="form">
                    <Container maxWidth="xl">
                        <form onSubmit={updatePost}>
                            <h1 className="text-center mt-5 text-muted">Update post</h1>
                            <h4 className="text-center mb-2 text-muted">Please <span className="text-success fw-bold">Register</span> or <span className="text-success fw-bold">Login</span> to update a post</h4>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
                            <input type="text" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
                            <input type="file" placeholder="Choose image" onChange={(e) => setFile(e.target.files)} />
                            <label htmlFor="select">Select Category:</label>
                            <Select defaultValue={selectedValue} name='select' onChange={handleChange}>
                                <Option value="technology">Technology</Option>
                                <Option value="technology-news">Technology news</Option>
                                <Option value="pets">Pets</Option>
                                <Option value="entertainment">Entertainment</Option>
                            </Select>
                            <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author Name" />

                            <ReactQuill modules={modules} formats={formats} value={content} onChange={(newValue) => setContent(newValue)} style={{ overflowY: 'scroll', height: '20vh' }} />
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

export default UpdatePage;
