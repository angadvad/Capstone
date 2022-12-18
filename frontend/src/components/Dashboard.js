import React from 'react';
import "../App.css";
import { ArrowForward, ArrowBack, DirectionsCar, LocalParking } from '@mui/icons-material';
import axios from "axios";
import LoadingSpinner from './LoadingSpinner'
import jwt_decode from "jwt-decode";
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

const in_out = {
  color: "green",
  height: "100%",
  width: "100%"
}

const taken = {
  backgroundColor: "red",
  color: "lightblue",
  height: "100%",
  width: "100%"
}

function Park(props) {

  if (props.value == 'park') {
    return (
      <button className='park' onClick={props.onClick}>
        <LocalParking className='hover_p'>FREE</LocalParking>
        <p className='hover_text'>{props.carpark.parking_space}</p>
      </button>
    )

  } else if (props.value == 'taken') {
    return (
      <button className='taken' onClick={props.onClick}>
        <DirectionsCar sx={taken}></DirectionsCar>
        <p className='hover_p'>{props.carpark.parking_space}</p>
      </button>
    )

  } else {
    return (
      <button className="" onClick={props.onClick}>
        ERROR
      </button>
    )
  }
}


const Dashboard = () => {

  const [parkState, setParkState] = useState([]);
  const [carparks, setCarparks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    getCarparks();

  }, []);


  const getCarparks = () => {

    axios.get(`http://localhost:5000/carpark/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {

        const carparksTemp = res.data;
        setIsLoading(true);
        setCarparks(carparksTemp);

        let parkStateTemp = Array(18).fill('park');

        for (let i = 0; i < parkStateTemp.length; i++) {
          if (carparksTemp[i].number_plate == '') {
            parkStateTemp[i] = 'park';
          } else {
            parkStateTemp[i] = 'taken';
          }
        }

        setParkState(parkStateTemp);

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })

  }



  function handleClick(i) {
    let path = `/`;
    navigate(path);
  }

  function takenClick(i) {
    alert(`This carpark is taken by number plate: ${carparks[i].number_plate}`)

  }

  function renderSquare(i) {
    if (parkState[i] == 'park') {
      return (<Park value={parkState[i]}
        onClick={() => handleClick(i)} carpark={carparks[i]} />);
    } else {
      return (<Park value='taken'
        onClick={() => takenClick(i)} carpark={carparks[i]} />);
    }
  };

  if (isLoading) {
    return (
      <div><LoadingSpinner></LoadingSpinner></div>
    )
  } else {
    return (
      <div class="main-bg bg-teal-500" >
        <div class="carpark">
          <div></div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          <div></div>

          <div class="road"><ArrowForward sx={in_out}></ArrowForward></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          {renderSquare(4)}

          <div class="road"></div>
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          <div class="road"></div>
          {renderSquare(8)}

          <div class="road"></div>
          {renderSquare(9)}
          {renderSquare(10)}
          {renderSquare(11)}
          <div class="road"></div>
          {renderSquare(12)}

          <div class="road"><ArrowBack sx={in_out}></ArrowBack></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          {renderSquare(13)}

          <div></div>
          {renderSquare(14)}
          {renderSquare(15)}
          {renderSquare(16)}
          {renderSquare(17)}
          <div></div>

        </div>
      </div>
    )
  }

}


export default Dashboard;