import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import './login-view.scss';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
//Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

//Validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username){
            setUsernameErr('Username Required');
            isReq = false;
        }else if(username.length < 5){
            setUsernameErr('Username must be 5 characters long');
            isReq=false;
        }
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        }else if(password.length < 6){
            setPasswordErr('Password must be 6 characters long');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
        /* Send a request to the server for authentication */
        axios.post('https://top-movies-api.herokuapp.com/login', {
          Username: username,
          Password: password
        })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
      }
    };


    return (
        <Form>
            <Form.Group controlId="formUsername" className='form'>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} required />
                {/* code added here to display validation error */}
                {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} required />
                {/*code added here to display validation error*/}
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <br></br>
            <Button variant='warning' type="submit" onClick={handleSubmit} className="button">
                Submit
            </Button>
            
        </Form>
        
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
}