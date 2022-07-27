import React from "react";
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

function UpdateUser({ handleSubmit, handleUpdate }) {
    return (
        <>
        <h4>Update</h4>
        <Form>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                type="text"
                defaultValue={user.Username}
                onChange={e => handleUpdate(e)}
                required
                placeholder="Enter a username" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                type="password"
                defaultValue={user.Password}
                onchange={e => handleUpdate(e)}
                required
                placeholder="Enter a Password" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                defaultValue={user.Email}
                onChange={e => handleUpdate(e.target.value)} 
                required
                placeholder="Enter a Email" />
            </Form.Group>
            <Button variant="primary" type="submit"
            onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
        </>
    )
}

export default UpdateUser