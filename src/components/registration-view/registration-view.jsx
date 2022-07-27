import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    //Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

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
        if (!email){
            setEmailErr('Email Required');
            isReq = false;
        } else if(email.indexOf("@") === -1){
            setEmailErr("You must enter a valid email adress");
            isReq = false;
        }

        return isReq;
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://top-movies-api.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert("Thanks for signing up. Welcome to my movie website!");
                window.open('/', '_self');
            })
            .catch(e => {
                console.log('error registering the user')
            });
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                <CardGroup>
                    <Card>
                        <Card.Body>
                        <Card.Title>Please Register</Card.Title>
                <Form>
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                placeholder="Username"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={8}
                                placeholder="Your password must be 6 or more characters"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email address"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={e => setBirthday(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}>
                            Register
                        </Button>
                    </Form>
                    </Card.Body>
                    </Card>
                </CardGroup> 
                </Col>
            </Row>
        </Container>
        // <form>
        //     <label>
        //         Username:
        //         <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        //     </label>
        //     <label>
        //         Password:
        //         <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        //     </label>
        //     <label>
        //         Email:
        //         <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
        //     </label>
        //     <label>
        //         Birthday:
        //         <input type='date' value={birthday} onChange={e => setBirthday(e.target.value)} />
        //     </label>
        //     <button type="submit" onClick={handleSubmit}>Register</button>
        // </form>
    );
}
