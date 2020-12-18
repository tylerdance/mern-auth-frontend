require('dotenv').config()
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import { Redirect } from 'react-router-dom'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

    }

    if (props.user) return <Redirect to="/profile" />

    return(
        <div className="row mt-4">
            <div className="col-md-7 off">
                <div className="card card-body">
                    <h2 className="py-2">Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" value={password} onChange={handlePassword} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;