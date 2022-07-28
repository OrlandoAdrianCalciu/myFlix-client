import React, { useEffect, useState } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './profile-view.scss';

export function ProfileView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [favouriteMovies, setFavouriteMovies] = useState({});
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [user, setUser] = useState('');
    const [movies, setMovies] = useState([]);
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const [favouriteMoviesList, setFavouriteMoviesList] = useState([]);

    const getUser = () => {
      let user = localStorage.getItem('user');
      let token = localStorage.getItem('token');
        axios.get(`https://top-movies-api.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
              setUsername(response.data.Username);
              setEmail(response.data.Email);
              setUser(response.data);
              setFavouriteMovies(response.data.FavouriteMovies);
              console.log(response);

              response.data.favouriteMovie.forEach((movies_id) => {
                let favMovies = props.movies.filter((movie) => movie._id === movies_id);
                setMovies(favMovies);
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }

    useEffect(() => {
        getUser();
    }, [])

    const handleDelete = () => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
        axios.delete(`https://top-movies-api.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert(`The account ${user.Username} was successfully deleted.`)
                localStorage.clear();
                window.open('/register', '_self');
            })
            .catch((error) => {
              console.log(error);
            });
        }

    const handleUpdate = () => {
      let user = localStorage.getItem('user');
      let token = localStorage.getItem('token');
      axios.put(`https://top-movies-api.herokuapp.com/users/${currentUser}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      },
      {
        headers: { Authorization: `Bearer ${token}`},
      }
      )
      .then((response) => {
        alert('Your profile has been updated');
        localStorage.setItem('user', response.data.Username),
        console.log(response.data);
        windows.open('/', '_self');
      })
      .catch((error) => {
        console.log(error);
      });
  }

    return (
      <Container>
      <Row>
        <h3>Profile</h3>
      </Row>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter new email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="birthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
            type="date"
            placeholder="birthday"
          />
        </Form.Group>
      </Form>
      <Button className="mt-2" onClick={handleUpdate}>
        Update your profile
      </Button>
      <Button className="mt-2 ml-4" onClick={handleDelete}>
        Delete your profile
      </Button>
      <h4>Favourite movies:</h4>
      <Card className="fav-list">
        <Card.Body>
          {favouriteMoviesList.map((movie) => {
            return (
              <div key={movie._id}>
                <img src={movie.ImagePath} alt={movie.Title} />
                <Link to={`/movies/${movie._id}`}>
                  <h4>{movie.Title}</h4>
                </Link>
              </div>
            );
          })}
        </Card.Body>
      </Card>
    </Container>
    );
}

ProfileView.propTypes = {
  profileView: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};