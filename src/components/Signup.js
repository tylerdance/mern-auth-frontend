require('dotenv').config()
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    function handleName(e) {
        setName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            const newUser = { name, email, password }

            axios.post(`${REACT_APP_SERVER_URL}/api/users/register`, newUser)
            .then(response => {
                console.log(response);
                setRedirect(true);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    if (redirect) return <Redirect to="/login" />

    return(
        <div className="row mt-4">
            <div className="col-md-7 off">
                <div className="card card-body">
                    <h2 className="py-2">Sign up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={name} onChange={handleName} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" value={password} onChange={handlePassword} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="text" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} className="form-control" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;