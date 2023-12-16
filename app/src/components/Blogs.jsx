import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';
import Error from './Error';
import Loader from './Loader';
import { format } from 'date-fns';
import MyContext from '../MyContext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Hero from './Hero';
import Container from '@mui/material/Container';

const Blogs = () => {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const { user } = useContext(MyContext);

    useEffect(() => {
        // Fetch posts when the component mounts or currentPage changes
        const fetchPosts = async (page) => {
            try {
                setLoader(true);
                // Fetch posts from the server with pagination parameters
                const res = await axios.get('https://myblogs-api.vercel.app/post/getallpost', {
                    params: {
                        page,
                        pageSize: 5,
                    },
                });

                // Update state with fetched posts, total pages, and current page
                setPosts(res.data.posts);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.currentPage);
                setLoader(false);
            } catch (error) {
                // Handle errors during the fetch
                setError(true);
                setLoader(false);
                console.log(error);
            }
        };

        // Fetch posts on initial render and when the currentPage changes
        fetchPosts(currentPage);
    }, [currentPage]);

    // Handle page change when the user selects a new page
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    if (error) {
        // Display an error message if there's an issue with fetching data
        return <Error />;
    }

    if (loader) {
        // Display a loading spinner while data is being fetched
        return <Loader />;
    }

    const formatDate = (dateString) => {
        // Format date string using date-fns library
        const parsedDate = new Date(dateString);

        if (isNaN(parsedDate)) {
            return '';
        }

        const formattedDate = format(parsedDate, 'MMM d , yyyy HH:mm');
        return formattedDate;
    };

    return (
        <>
            <section>
                {/* Display the hero section at the top of the page */}
                <Hero />
                <Container maxWidth="xl" sx={{ marginTop: '80px' }}>
                    {/* Your existing code for blog types goes here... */}

                    {/* Display the heading for the blog section */}
                    <h1 className="text-muted fw-bold mt-5">Blogs : </h1>
                </Container>
            </section>

            {/*
          Display a message if there are no published blogs,
          otherwise, map through the posts and render each post component.
        */}
            {!Array.isArray(posts) || posts.length === 0 ? (
                <h1 className="my-5">
                    At present, there are no published blogs. Be a trailblazer and contribute
                    by creating the inaugural blog post.
                </h1>
            ) : (
                posts.map((item) => (
                    <Posts
                        key={item._id}
                        title={item.title}
                        summary={item.summary}
                        content={item.content}
                        image={`https://myblogs-api.vercel.app/uploads/${item.picturePath.replace(
                            /\\/g,
                            '/'
                        )}`}
                        id={item._id}
                        user={user}
                        time={formatDate(item.createdAt)}
                        author={item.author}
                        views={item.views}
                        comments={item.comments.length}
                    />
                ))
            )}
            {/*
          Display pagination component to navigate through pages.
          Stack component is used to control spacing.
        */}
            <div className="container my-5 d-flex justify-content-center">
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        color="primary"
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </div>

        </>
    );
};

const Posts = React.memo(({ title, summary, time, image, id, views, author, comments }) => {
    return (
        <>
            <section className="blogs" style={{ marginTop: '50px' }}>
                <Container maxWidth='xl'>
                    <div className="row-flex">
                        <div className="col-in">
                            <div className="blog-image">
                                <img src={image} alt="" />
                            </div>
                        </div>
                        <div className="col-in">
                            <div className="blog-text">
                                <h1>{title}</h1>
                                <span className='text-muted'>{summary}</span>
                                <p className='text-muted'><span className="fw-bold">Author :</span> {author}</p>
                                <p className='text-muted'><span className="fw-bold"><RemoveRedEyeIcon /> </span> {Math.floor(views / 6)}</p>
                                <p className='text-muted'><span className="fw-bold"><CommentIcon /> </span> {comments} </p>
                                <Button className='mt-3' component={Link} to={`/singlepost/${id}`} sx={{ border: '1px solid black' }}>
                                    Read More
                                    <ArrowForwardIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
});


export default Blogs;
