import React, { useEffect, useState, useContext } from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { format } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import Comments from '../components/Comments';
import cookie from 'js-cookie';
import DOMPurify from 'dompurify';
import MyContext from '../MyContext';
import Cookie from 'js-cookie'





const SinglePost = () => {
    const [loader, setLoader] = useState(false);
    const [post, setPost] = useState([]);
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')
    const { id } = useParams();
    const navigateTo = useNavigate();
    const token = cookie.get('token');
    const { user, setUser } = useContext(MyContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/post/getsinglepost/${id}`)
                setPost(res.data)
                // console.log(format(new window.Date(post.createdAt), 'yyyy-LL-dd'))
                console.log(res.data)

            } catch (error) {
                setError(true)
                console.error('Error Fetching post:', error);

                setLoader(false)
            }
        }

        fetchData()
    }, [])

    const deletePost = async () => {
        try {
            if (!token) {
                toast.error('Login or register first', {
                    theme: 'dark',
                });
                return;
            }

            const res = await axios.delete(`http://localhost:4000/post/deletepost/${id}`, { withCredentials: true }).then(() => {
                alert('Deleted post')
                navigateTo('/');

            }).catch(err => {
                toast.error(err.response.data.message, {
                    theme: 'dark',
                });
            })

            setLoader(false);
            console.log(res)


        } catch (error) {
            setError(true);

            toast.error(error.response.data, {
                theme: 'dark',
            });

            setLoader(false);
        }
    };


    const formatDate = (dateString) => {
        const parsedDate = new Date(dateString);

        // Check if parsedDate is a valid date
        if (isNaN(parsedDate)) {
            // console.error('Invalid date:', dateString);
            return ''; // Return an empty string or any default value if the date is invalid
        }

        const formattedDate = format(parsedDate, 'MMM d , yyyy HH:mm');
        return formattedDate;
    };

    const sharePost = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Your post title',
                text: 'Check out this post!',
                url: window.location.href,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support the Web Share API
            // You can provide a link or any custom share functionality here
            console.log('Web Share API not supported.');
        }
    };

    const deletePostWithConfirmation = () => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');

        if (confirmation) {
            deletePost();
        }
    };



    return (
        <>

            {
                loader ? <Loader /> :
                    <Blog
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        summary={post.summary}
                        content={post.content}
                        image={`http://localhost:4000/uploads/${post.picturePath}`}
                        time={formatDate(post.createdAt)}
                        deletePost={deletePostWithConfirmation}
                        user={user}
                        author={post.author}
                        sharePost={sharePost}
                        views={post.views}
                    />

            }
            <Container maxWidth='10px'>

                <Comments />
            </Container>

            <ToastContainer />
        </>
    )
}

const Blog = ({ views, title, content, image, time, deletePost, user, author, id, sharePost }) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return (
        <Container maxWidth='l'>
            <section className="single-blog mt-5 ms-md-5">
                <div className="single-post-heading">
                    <h4 className="text-muted">
                        <Link to={'/'} className='text-muted'>Back</Link>
                    </h4>
                    <h3>Views : {Math.floor(views / 6)}</h3>
                    <h1 className='display-3 fw-bold' style={{ color: '#0b153a' }}>{title}</h1>
                    <div className="author">
                        <h5 className="mt-5">Auhtor : {author}</h5>
                        <p className="text-muted">CreateAt : {time}</p>
                        <Button onClick={deletePost} variant='contained' className='mt-3'>Delete Post</Button>
                        <Button component={Link} to={`/updatepost/${id}`} variant='contained' className='mt-3 ms-2 text-light'>Update Post</Button>
                    </div>
                </div>

                <div className="content mt-3">
                    <div className="single-post-image mt-3">
                        <img src={image} alt="" />
                    </div>

                    <div className="blog-p-text mt-5">
                    <p className='text-muted' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

                    </div>
                </div>

            </section>
        </Container>
    )
}
export default SinglePost
