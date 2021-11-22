import React from 'react';
import { Link, Outlet } from 'react-router-dom';


function Profile() {

    return <>
        <nav className="buttons">
            <Link to='/home/profile/changepass'> <button className="button">Change Password</button></Link>
            <Link to='/home/profile/changeuser'><button className="button">Change User</button></Link>
            <Link to='/home/profile/unregister' ><button className="button">Unregister</button></Link>
            <Link to='/home'> <button className="button">Log out</button></Link>
        </nav>
        <div>
            <Outlet />
        </div>
    </>
}
export default Profile