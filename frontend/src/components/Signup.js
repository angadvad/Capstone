import { useState } from "react"
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { useNavigate, Link } from "react-router-dom";
import AlertComp from "./AlertComp.js";
import axios from "axios";

function Signup(props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '', //required
        number_plate: '', //
        password: '', // required
        confPassword: ''
    });

    const [open, setOpen] = useState(false);
    const [alertText, setAlertText] = useState("Error");

    const Register = async (e) => {
        const regNumberPlate = /[A-Z]{1,6}[0-9]{1,6}/;
        const regEmailAddress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        e.preventDefault();
        let emailCheck = false;

        if(regEmailAddress.exec(formData.email)==null){
            emailCheck = false;
        }else{
            emailCheck = regEmailAddress.exec(formData.email) ? true : false;
        }
        

        if (regNumberPlate.exec(formData.number_plate) && emailCheck && formData.name!=='') {
            if (formData.number_plate.length > 6) {
                setOpen(true);
                setAlertText("Number Plate has to be 6 characters");
            } else {
                try {
                    await axios.post('http://localhost:5000/users', {
                        name: formData.name,
                        email: formData.email,
                        number_plate: formData.number_plate,
                        password: formData.password,
                        confPassword: formData.confPassword
                    });
                    routeChangeHome();
                } catch (error) {

                    if (error.response) {
                        console.log(error.response)
                        setOpen(true);
                        setAlertText(`${error.response.data.msg}`);
                    }
                }
            }
        } else {

            if (!regNumberPlate.exec(formData.number_plate)) {
                setOpen(true);
                setAlertText("Number Plate isn't valid");
            }else if(regEmailAddress.exec(formData.email)==null || formData.email == ''){
                setOpen(true);
                setAlertText("Email isn't valid");
            }else{
                setOpen(true);
                setAlertText("Please fill in missing fields");
            }

        }

    }


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }

    const routeChangeHome = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <div className='h-screen w-full flex flex-col justify-center bg-teal-500'>
            <form className='login-form max-w-[370px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={e => Register(e)}>
                <div class="w-[200px] h-[200px] bg-transparent cursor-pointer group perspective">
                    <div class="preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
                        <div class="absolute backface-hidden w-full h-full">
                            <h2 className='text-4xl dark:text-white font-bold text-center'><DirectionsCarFilledIcon class="scale-5 bg-teal-500 rounded-3xl"></DirectionsCarFilledIcon></h2>
                        </div>
                        <div class="absolute my-rotate-y-180 backface-hidden w-full h-full bg-gray-100 overflow-hidden rounded-3xl">
                            <div class="bg-teal-500 w-full h-full text-center flex flex-col items-center justify-center scale-[2.5]">
                                <DirectionsCarFilledIcon fontSize="large"></DirectionsCarFilledIcon>
                                <p class="scale-[0.75]">SIGN UP</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Name</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        type='text' placeholder='Bob Ross' value={formData.name} name='name' onChange={e => handleChange(e)} ></input>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Email</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        type='text' placeholder='bob@gmail.com' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Number Plate</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        type='text' placeholder='Number Plate' value={formData.number_plate} name='number_plate' onChange={e => handleChange(e)} ></input>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        type='text' placeholder='*******' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Confirm Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        type='text' placeholder='*******' value={formData.confPassword} name='confPassword' onChange={e => handleChange(e)} ></input>
                </div>
                <button type='submit' className='w-full my-2 py-2 bg-teal-500 shadow-lg hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>CREATE NEW USER</button>
                <button className='text-gray-400 py-2' onClick={routeChange}>Already have a login?</button>
                <AlertComp open={open} setOpen={setOpen} text={alertText} />
            </form>
        </div>
    )
}

export default Signup