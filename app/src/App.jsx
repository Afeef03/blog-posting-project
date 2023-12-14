import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CreatePost from './pages/CreatePost'
import Error from './components/Error'
import Login from './pages/Login'
import Register from './pages/Register'
import NoPageFound from './pages/NoPageFound'
import ProfilePage from './pages/ProfilePage'
import Logout from './pages/Logout'
import BackTotop from './components/BackTotop'
import SinglePost from './pages/SinglePost'
import MyContextProvider from './MyContextProvider';
import UpdatePage from './pages/UpdatePage'
import Blogs from './components/Blogs'
import Test from './components/Test'
import UpdateUser from './pages/UpdateUser'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'



function App() {


  return (
    <>
      <Router>
        <MyContextProvider>

          <Navbar />
          <Routes>
            <Route path='/' exact element={<Blogs />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/logout' exact element={<Logout />} />
            <Route path="/singlepost/:id" element={<SinglePost />} />
            <Route path="/updatepost/:id" element={<UpdatePage />} />
            <Route path="/updateuser/:id" element={<UpdateUser />} />
            <Route path="/test" element={<Test />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/*" element={<NoPageFound />} />
          </Routes>

          <Footer />
          <BackTotop />

        </MyContextProvider>
      </Router>
    </>
  )
}

export default App
