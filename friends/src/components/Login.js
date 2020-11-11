import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';

const initialFormValues = {
    username: '',
    password: ''
}

const StyledLogin = styled.div`
    button {
        margin-top: .5%;
    }
`

const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const history = useHistory();

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const login = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/login', formValues)
            .then(req => {
                console.log(req);
                localStorage.setItem("token", req.data.payload)
                history.push('/friends-list')   
            })
            .catch(err => {
                console.log(err);
                setFormValues(initialFormValues);
            })
    }

    return (
        <StyledLogin>
            <form onSubmit={login}>
                <label>Username
                    <br></br>
                    <input 
                        type='text'
                        name='username'
                        value={formValues.username}
                        onChange={handleChange}
                    />
                </label>
                <br></br>

                <label>Password
                    <br></br>
                    <input 
                        type='password'
                        name='password'
                        value={formValues.password}
                        onChange={handleChange}
                    />
                </label>
                <br></br>
                
                <button className="button">Log in</button>
            </form>
        </StyledLogin>
    )
}

export default Login;