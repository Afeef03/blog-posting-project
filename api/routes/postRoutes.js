const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { createPost, getAllPost, getSinglePost, updatePost, deletePost , addCommentSinglePost } = require('../controller/postController');
const { verifyToken , isAdmin } = require('../middleware/verifyToken');



// Create a multer storage configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });


// Define routes with unique endpoints
router.post('/createpost', verifyToken,isAdmin, upload.single('file'), createPost);
router.get('/getallpost', getAllPost);
router.put('/addcomment/:id', addCommentSinglePost);
router.get('/getsinglepost/:id', getSinglePost); // Adjusted to include post ID in the URL
router.put('/updatepost/:id', verifyToken,isAdmin, upload.single('file'), updatePost); // Adjusted to include post ID in the URL
router.delete('/deletepost/:id', verifyToken,isAdmin, deletePost); // Adjusted to include post ID in the URL

module.exports = router;
