import React, { createContext } from 'react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const Login = (props) => {

    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/signup`;
        navigate(path);
    }

    const routeChangeHome = () => {
        let path = `/`;
        navigate(path);
    }

    const [formData, setFormData] = useState({
        email: '',
        password: '' // required
    });

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: formData.email,
                password: formData.password
            }).then(function (res) {
                localStorage.setItem("user_id", `${res.data.userId}`)
                localStorage.setItem("token", `${res.data.accessToken}`)
                localStorage.setItem("isLoggedIn", true)
                if (formData.email == "admin"){
                    localStorage.setItem("isAdmin", true)
                }
            });
            routeChangeHome();
        } catch (error) {
            if (error.response) {
                console.log('error')
            }
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (

        <div className='h-screen w-full flex flex-col justify-center bg-teal-500'>
            <form className='login-form max-w-[370px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={e => Auth(e)}>
                <div className="w-[200px] h-[200px] bg-transparent cursor-pointer group perspective">
                    <div className="preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
                        <div className="absolute backface-hidden w-full h-full">
                            <h2 className='text-4xl dark:text-white font-bold text-center'><DirectionsCarFilledIcon class="scale-5 bg-teal-500 rounded-3xl"></DirectionsCarFilledIcon></h2>
                        </div>
                        <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-gray-100 overflow-hidden rounded-3xl">
                            <div className="bg-teal-500 w-full h-full text-center flex flex-col items-center justify-center scale-[2.5]">
                                <DirectionsCarFilledIcon fontSize="large"></DirectionsCarFilledIcon>
                                <p className="scale-[0.75]">PARKABLE</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Email</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' autoComplete="off"
                        type='text' placeholder='bob@gmail.com' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        type='password' placeholder='*******' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                </div>


                <div className='flex justify-between text-gray-400 py-2'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    <button>Forgot Password?</button>
                </div>
                <button type='submit' className='w-full my-5 py-2 bg-teal-500 shadow-lg hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>LOGIN</button>
                <button onClick={routeChange} className='w-full py-2 bg-teal-500 shadow-lg hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SIGN UP</button>

            </form>


        </div>
    )
}

export default Login;
