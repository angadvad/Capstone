import { Grid, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import axios from "axios";

const Navbar = (props) => {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const Logout = async () => {

        
        try {
            await axios.delete('http://localhost:5000/logout');
            localStorage.clear(); 
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoggedIn) {
        return (
            <Grid container className='bg-gray-800'>
                <Grid item xs>
                    <Button sx={{ color: 'teal' }} onClick={() => navigate("/home")}><DirectionsCarFilledIcon></DirectionsCarFilledIcon></Button>
                </Grid>
                <Grid item xs>
                    <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
                </Grid>
                <Grid item xs>
                    <Button onClick={() => navigate("/parkinglist")}>Park List</Button>
                </Grid>
                <Grid item xs>
                    <Button onClick={Logout}>Logout</Button>
                </Grid>
            </Grid>)
    } else {
        return (
            <Grid container className='bg-gray-800'>
                <Grid item xs>
                    <Button sx={{ color: 'teal' }} onClick={() => navigate("/home")}><DirectionsCarFilledIcon></DirectionsCarFilledIcon></Button>
                </Grid>
            </Grid>)
    }

}

export default Navbar;
