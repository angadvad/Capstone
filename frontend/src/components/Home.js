import React, { createContext } from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import AlertComp from "./AlertComp.js"
import { DirectionsCar } from '@mui/icons-material';
import LoadingSpinner from './LoadingSpinner';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate, Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip);

const Home = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: 0,
    number_plate: '',
    parking_space: ''
  });

  const [spaces, setSpaces] = useState('');
  const [userParkedCars, setUserParkedCars] = useState('');
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState("Error");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCarParkSpaces();
    getParkedCars();
  }, []);

  useEffect(() => {
    if (typeof spaces == 'object') {
      const idValue = spaces.filter(element => element.parking_space == formData.parking_space)[0].id;
      setFormData({ ...formData, ['id']: idValue })
    }
  }, [formData.parking_space])

  const getCarParkSpaces = () => {
    axios.get(`http://localhost:5000/freeparks`)
      .then(res => {

        const carpark = res.data;

        setSpaces(carpark);
        const initSpace = carpark[0].parking_space;
        const initIdValue = carpark[0].id;

        setFormData({
          id: initIdValue,
          number_plate: '',
          parking_space: initSpace
        })

        setTimeout(() => {
          setIsLoading(false);
        }, 500);

      })
  }

  

  const getParkedCars = () => {

    axios.post(`http://localhost:5000/findparkedcars`, {
      user_id: localStorage.getItem("user_id")
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function (response) {
        setUserParkedCars(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const re = /[A-Z]{1,6}[0-9]{1,6}/;
    e.preventDefault()

    if (re.exec(formData.number_plate)) {
      if (formData.number_plate.length > 6) {
        setOpen(true);
        setAlertText("Number Plate has to be 6 characters");
      } else {

        axios.post(`http://localhost:5000/updatecarpark`, {
          id: formData.id,
          user_id: localStorage.getItem("user_id"),
          number_plate: formData.number_plate,
          parking_space: formData.parking_space
        }, {
          headers: { 'Content-Type': 'application/json' }
        })
          .then(function (response) {
            window.location.reload(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      setOpen(true);
      setAlertText("Please enter a valid Number Plate");
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const OptionSpaces = () => {
    let output = [];
    for (const key in spaces) {
      output.push(<option key={spaces[key].id}>{spaces[key].parking_space}</option>);
    }

    return (output);
  }

  function stopParking(key) {

    axios.post(`http://localhost:5000/updatecarpark`, {
      id: userParkedCars[key].id,
      user_id: -1,
      number_plate: ''
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function (response) {
        window.location.reload(false);
      })

  }

  const ParkedCars = () => {

    let output = [];

    for (const key in userParkedCars) {
      output.push(
        <li class="list-none" key={userParkedCars[key].id}>
          <div class="block p-6 rounded-lg shadow-lg bg-gray-900 max-w-[300px] mb-10">
            <div class="flex justify-between mb-4">
              <a href="#!" class="font-medium text-gray-400 hover:text-purple-700 
            focus:text-purple-800 duration-300 transition ease-in-out text-sm">{userParkedCars[key].number_plate}</a>
              <a href="#!" class="font-medium text-gray-400 hover:text-purple-700 
            focus:text-purple-800 duration-300 transition ease-in-out text-sm">Parking Space: {userParkedCars[key].parking_space}</a>
            </div>
            <button type="button" onClick={() => stopParking(key)} class="inline-block px-4 mr-4 py-1.5 bg-teal-600 text-white font-medium text-xs leading-tight 
          uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg" data-mdb-ripple="true">Stop Parking</button>
          </div>
        </li>
      );
    }

    if (output.length<1) {
      output.push(
        <li class="list-none" key="1">
          <div class="block p-6 rounded-lg shadow-lg bg-gray-900 max-w-[230px] mb-10">
            <div class="flex justify-between mb-4">
              <a href="#!" class="font-medium text-gray-400 hover:text-purple-700 
            focus:text-purple-800 duration-300 transition ease-in-out text-sm">You have no parked cars</a>
            </div>
            <button type="button" onClick={() => navigate('/dashboard')} 
            class="inline-block px-4 mr-4 py-1.5 bg-teal-600 text-white font-medium text-xs leading-tight 
            uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg" data-mdb-ripple="true">Look for carparks</button>
          </div>
        </li>
      );
      return (output);
    } else {
      return (output);
    }

  }

  const chartData = {

    labels: ['Free', 'Taken'],
    datasets: [
      {
        label: 'Carparks',
        data: [spaces.length, 18 - spaces.length],
        backgroundColor: [
          'rgba(54, 162, 235,0.8)',
          'rgba(255, 99, 132,0.8)'

        ],
        borderColor: [
          'rgba(54, 162, 235)',
          'rgba(255, 99, 132)'
        ],
        borderWidth: 1,
      },
    ],
  };


  if (isLoading) {
    return (<div><LoadingSpinner></LoadingSpinner></div>);

  } else {
    return (
      <div className='h-screen w-full grid grid-cols-3 px-10 py-10 bg-teal-500'>
        <div class="col-span-1">
          <h3 class="text-2xl text-gray-700 font-bold mb-6">Park <DirectionsCar /> Able</h3>
          <form className='login-form w-auto h-auto max-h-[350px] max-w-[350px] rounded-lg bg-gray-900 pb-8 px-8' onSubmit={e => handleSubmit(e)}>
            <div className='flex flex-col text-gray-400 py-2'>
              <label>Enter Number Plate</label>
              <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                type='text' placeholder='' name='number_plate' onChange={e => handleChange(e)}></input>
            </div>
            <AlertComp open={open} setOpen={setOpen} text={alertText} />
            <div className='flex flex-col text-gray-400 py-2'>
              <label className="text-gray-400 mr-10">Select Parking Space</label>
              <select className='rounded-lg bg-gray-700 mt-2 p-2 text-gray-400'
                id="grid-state" name='parking_space' value={formData.parking_space} onChange={e => handleChange(e)}>
                <OptionSpaces />
              </select>
            </div>

            <button type='submit' className='w-full my-5 py-2 bg-teal-500 shadow-lg hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>START PARKING</button>
          </form>

        </div>


        <div class="col-span-1">
          <h3 class="text-2xl text-gray-700 font-bold mb-6">Parked Cars</h3>
          <ol>
            <ParkedCars></ParkedCars>
          </ol>
        </div >

        <div class="col-span-1">
          <h3 class="text-2xl text-gray-700 font-bold mb-6">Available Slots</h3>
          <div class="block p-6 rounded-lg shadow-lg bg-gray-900 max-w-[300px] mb-10">
            <Doughnut data={chartData} />
          </div>
        </div>

      </div >

    );

  }

}

export default Home;


