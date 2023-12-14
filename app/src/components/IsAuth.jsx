import React from 'react'
import cookie from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IsAuth = () => {

    const checkAuth = async() => {
        try {
            const token = cookie.get('token');

            if(!token){
                toast.success("Please login or register first",{
                    theme:'dark'
                })
            } 
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
       <ToastContainer />
    </div>
  )
}

export default IsAuth
