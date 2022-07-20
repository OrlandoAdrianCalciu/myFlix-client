
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegistration(false);
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
                                placeholder="Your password must be 8 or more characters"
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

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};