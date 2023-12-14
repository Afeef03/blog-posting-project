import React, { useState } from 'react';
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
import Cookie from 'js-cookie'
import DOMPurify from 'dompurify';


const CreatePost = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false)
  const [selectedValue, setSelectedValue] = useState('technology');
  const sanitizedContent = DOMPurify.sanitize(content);

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

  const createPost = async (e) => {
    e.preventDefault();

    if (!Cookie.get('token')) {
      toast.error('Login or register first', {
        theme: 'dark',
      });
      return;
    }

    data.append('author', author);
    data.append('title', title);
    data.append('summary', summary);

    // Sanitize the content just before appending it to FormData
    const sanitizedContent = DOMPurify.sanitize(content);
    data.append('content', sanitizedContent);

    data.append('file', file[0]);
    data.append('category', selectedValue);

    try {
      setLoader(true);
      const res = await axios.post("http://localhost:4000/post/createpost", data, { withCredentials: true }).then(() => {
        toast.success("Post created successfully", {
          theme: 'dark',
        });
      }).catch((error) => {
        toast.error(error.response.data.message);
      });

      console.log(res);
      setSummary('');
      setContent('');
      setTitle('');
      setAuthor('');
      setLoader(false);
    } catch (error) {
      setError(true);
      console.error('Error creating post:', error);
      setLoader(false);
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


  return (
    <>
      {
        loader ? <Loader /> : <section className="form">
          <Container maxWidth="xl">
            <form onSubmit={createPost}>
              <h1 className="text-center mt-5 text-muted">Create a post</h1>
              <h4 className="text-center mb-2 text-muted">Please <span className="text-success fw-bold">Register</span> or <span className="text-success fw-bold">Login</span> to create a post</h4>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title | max-words-10 | min-words-5" />
              <input type="text" placeholder="Summary | max-words-10 | min-words-5" value={summary} onChange={(e) => setSummary(e.target.value)} />
              <input type="file" placeholder="Choose image" onChange={(e) => setFile(e.target.files)} />
              <label htmlFor="select">Select Category:</label>
              <Select defaultValue={selectedValue} name='select' onChange={handleChange}>
                <Option value="technology">Technology</Option>
                <Option value="technology-news">News</Option>
                <Option value="pets">Pets</Option>
                <Option value="entertainment">Entertainment</Option>
                <Option value="real-state">Real State</Option>
              </Select>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author Name" />

              <ReactQuill modules={modules} formats={formats} value={content} onChange={(newValue) => setContent(newValue)} />


              <Button type="submit" variant="contained">
                Create post
              </Button>
            </form>
            <ToastContainer />
          </Container>
        </section>
      }
    </>
  );
};

export default CreatePost;
