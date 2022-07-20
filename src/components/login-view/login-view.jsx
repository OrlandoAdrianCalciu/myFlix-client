import React, { useState } from "react";
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';


export function LoginView(props){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server
        // then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    const handleRegister = (e) => {
        e.preventDefault()
        props.onRegistration(true)
    }

    return(
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Form.Text>Not signed up yet?</Form.Text>
            <Button variant="primary" type="submit" onClick={handleRegister}>
                Register
            </Button>
        </Form>
        // <form>
        //     <label>
        //         Username:
        //         <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        //     </label>
        //     <label>
        //         Password:
        //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        //     </label>
        //     <button type="submit" onClick={handleSubmit}>Submit</button>
        //     <p>Not signed up yet ?</p>
        //     <button type="submit" onClick={handleRegister}>Register</button>
        // </form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
}