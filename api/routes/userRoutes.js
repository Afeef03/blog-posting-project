const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { getSingleUser, register, login, logout, updateuser , sendOtp , verifyOtpAndUpdateUser , updateUserPassword } = require('../controller/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadMiddleware = multer({ dist: '../uploads' });
const upload = multer({ storage: storage });



router.get('/singleuser/:id', getSingleUser);

// Apply isAdmin middleware to routes that should be restricted to admin users
router.post('/register', upload.single('file'), register);
router.put('/updateuser/:id', upload.single('file'), updateuser);
router.get('/sendotp/:id', sendOtp);
router.post('/verifyotp/:id', verifyOtpAndUpdateUser);
router.post('/verifypassword/:id', updateUserPassword);

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
