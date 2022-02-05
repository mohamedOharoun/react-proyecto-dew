import {  Link, useNavigate } from "react-router-dom";

export const Menu = (name) => {
    const style = {width: "100%"}
    const navigate = useNavigate();

    const logOut = () => {
        const myStorage = window.localStorage;
        myStorage.clear();

        if(!(myStorage.getItem('token')) && !(myStorage.getItem('name'))){
            navigate('/login');
        }
    };

    return(
        <nav style={style} className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
            <span className="text-light fs-5 ms-lg-3">Plan Your Time</span>

            <ul className="navbar-nav me-lg-3">
                <li className="nav-item mt-2 text-light">Welcome, {name.name}</li>

                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item mt-2 text-light">
                    |
                </li>
                <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={logOut}>Log Out</button>
                </li>
            </ul>

        </nav>
    );
}

export default Menu;