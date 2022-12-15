import {Outlet} from 'react-router'
import Login from '../components/Login';

const ProtectedRoutes = (props) => {
    const isAuth=localStorage.getItem('isLoggedIn');
    return isAuth ? <Outlet {...props}/> : <Login {...props}/> 
}

export default ProtectedRoutes;