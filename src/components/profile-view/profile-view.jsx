import React, { useEffect, useState } from "react";
import axios from 'axios';

import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './profile-view.scss';
import UserInfo from './user-info';
import FavouriteMovies from "./favourite-movies";
import UpdateUser from "./update-user";

export function ProfileView({ movies, onUpdatedUserInfo }) {
    const [user, setUser] = useState(props.user);
    const [movies, setMovies] = useState(props.movies);
    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const getUser = () => {
        axios.get(`https://top-movies-api.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUser(response.data);
                setFavouriteMovies(response.data.FavoriteMovies)
            })
            .catch(e => {
                console.error(error)
            })

    }

    useEffect(() => {
        getUser();
    }, [])

    const handleDelete = () => {
        axios.delete(`https://top-movies-api.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert(`The account ${user.Username} was successfully deleted.`)
                localStorage.clear();
                window.open('/register', '_self');
            })
            .catch(e => {
                console.error(error)
            })
    }

    return (
        <Container>
            <Row>
                <Col xs={12} sm={4}>
                    <Card>
                        <Card.Body>
                            <UserInfo name={user.Username} email={user.Email} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={8}>
                    <Card.Body>
                        <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
                    </Card.Body>
                </Col>
            </Row>
            <FavoriteMovies favoriteMovieList={favoriteMovieList} />
        </Container>
    )
}