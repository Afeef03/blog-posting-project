import React, { useEffect, useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Error from './Error';
import Loader from './Loader';
import MyContext from '../MyContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Comments = () => {
    // State hooks to manage comment input, post ID, loading state, error state, and comments list
    const [text, setText] = useState('');
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [comments, setComments] = useState([]);
    const { user } = useContext(MyContext);

    // Function to add a new comment
    const fetchComments = async () => {
        try {
            // Send a PUT request to add a comment to the post
            await axios.put(`http://localhost:4000/post/addcomment/${id}`, { text }, { headers: { 'Content-Type': 'application/json' } });
            // After adding the comment, clear the input and refetch the comments to get the updated list
            setText('');
            fetchData();
        } catch (error) {
            // Handle errors by setting the error state and logging the error
            setError(true);
            console.error('Error Adding Comment:', error);
        }
    };

    // Function to fetch comments for the current post
    const fetchData = async () => {
        try {
            // Send a GET request to retrieve comments for the current post
            const res = await axios.get(`http://localhost:4000/post/getsinglepost/${id}`);
            // Update the comments state with the received data
            setComments(res.data.comments);
        } catch (error) {
            // Handle errors by setting the error state and logging the error
            setError(true);
            console.error('Error Fetching post:', error);
        } finally {
            // Set loader to false once the request is complete
            setLoader(false);
        }
    };

    // useEffect hook to fetch comments when the component mounts or when the post ID changes
    useEffect(() => {
        fetchData();
    }, [id]);

    // Render section of the component
    if (error) {
        // Render an Error component if an error occurs
        return <Error />;
    }
    if (loader) {
        // Render a Loader component while comments are being fetched
        return <Loader />;
    }

    // Render the main comments section with input, button, and comments list
    return (
        <section className="mt-5 comments">
            <h2 className="fw-bold">Comments</h2>
            <div className="comment-input mt-4" style={{ marginLeft: '5%' }}>
                {/* Input field for adding comments */}
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        display: 'flex',
                    }}
                >
                    <TextField fullWidth value={text} onChange={(e) => setText(e.target.value)} label="Add comment here..." id="fullWidth" />
                {/* Button to trigger adding a comment */}
                <Button variant="contained" sx={{ marginLeft: '20px' }} onClick={fetchComments}>
                    Add Comment
                </Button>
                </Box>
            </div>

            {/* Display comments in reverse order (most recent first) */}
            {comments.slice().reverse().map((item) => (
                // Render individual comment using the Comment component
                <Comment key={item._id} id={item._id} text={item.text} user={user} />
            ))}
        </section>
    );
};

// Comment component to render an individual comment
const Comment = ({ text }) => {
    return (
        <div className="all-comments mt-5">
            <div className="single-comment mt-3">
                {/* Avatar for the commenter */}
                <Avatar sx={{ bgcolor: 'red[500] ' }} aria-label="recipe" >
                    U
                </Avatar>
                <span className="cmt">
                    {/* Display commenter's name and the comment text */}

                    <p className="user-comment">{text}</p>
                </span>
            </div>
        </div>
    );
};

export default Comments;
