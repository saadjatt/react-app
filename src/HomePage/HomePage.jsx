import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
   
    const [userUpdate, setUserUpdate] = useState({
        id:'',
        firstName: '',
        lastName:'',
        
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserUpdate(userUpdate => ({ ...userUpdate, [name]: value }));
    }

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    function handleUpdateUser() {
        //setUserUpdate({id: document.getElementById('id').value, firstName: document.getElementById('firstName').value})
        dispatch(userActions.update(userUpdate));
        dispatch(userActions.getAll());
        //alert("OK"+document.getElementById('firstName').value);

    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
     
     
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.id+'# '+user.firstName + ' ' + user.lastName}
                            {/* {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                                
                            } */}
                        </li>
                    )}
            


                </ul>
            }
            <div className='row'>
                <div className='col-md-3'>
                    <input type='number' placeholder='ID#' alue={userUpdate.id} onChange={handleChange} id='id' name='id' className='form-control' />
                </div>
                <div className='col-md-4'>
                    <input type='text' placeholder='First Name' alue={userUpdate.firstName} onChange={handleChange} id='firstName' name='firstName' className='form-control' />
                </div>
                <div className='col-md-4'>
                    <input type='text' placeholder='Last Name' alue={userUpdate.lastName} onChange={handleChange} id='lastName' name='lastName' className='form-control' />
                </div>
                <div className='col-md-1'>
                    <button className='btn btn-primary' onClick={() => handleUpdateUser()}  >Update</button>
                </div>
            </div>
            <br></br>
            <div className='row mt-20'>
                <div className='col-md-4'>
            
                    <p>
                        <Link to="/login" className='btn btn-warning'>Logout</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export { HomePage };