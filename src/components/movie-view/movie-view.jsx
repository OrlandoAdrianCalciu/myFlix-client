import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./movie-view.scss"

export class MovieView extends React.Component {

  addMovie(movie, user) {
    let username = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    console.log(movie);
    console.log(token);

    axios
      .post(
        `https://top-movies-api.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been added to your list.`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  delMovie = (movie, user) => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("user");
    console.log(movie);
    console.log(token);
    axios
      .delete(
        `https://top-movies-api.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been removed from your list.`);
      })
      .catch((e) => {
        console.log("Error");
      });
  };


  render() {
    const { movie, user, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
          <Card className='movie-view' >
            <Card.Body className='card-view'>
              <Card.Img className='movie-poster' src={movie.ImagePath} />
              <Card.Title className='movie-title'>{movie.Title}</Card.Title>

              <Card.Text className='text-style'>{movie.Description}</Card.Text>

              <Card.Text className='text-style'>Genre: {movie.Genre.Name}
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant='link'>read more</Button>
              </Link>
              </Card.Text>

              <Card.Text className='text-style'>Director: {movie.Director.Name}
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant='link'>read more</Button>
              </Link>
              </Card.Text>

              <Button variant='outline-danger' onClick={() => { onBackClick() }}>Back</Button>
              <Button variant='outline-warning' className="button ml-2" onClick={() => { this.addMovie(movie, user);}}>
          Add to favourites
        </Button>
        <Button variant='outline-warning' className="button ml-2" onClick={() => { this.delMovie(movie, user);}}>
          Delete from favourites
        </Button>

            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
      // <div className="movie-view">
      //   <div className="movie-poster">
      //     <img src={movie.ImagePath} />
      //   </div>
      //   <div className="movie-title">
      //     <span className="label">Title: </span>
      //     <span className="value">{movie.Title}</span>
      //   </div>
      //   <div className="movie-description">
      //     <span className="label">Description: </span>
      //     <span className="value">{movie.Description}</span>
      //   </div>
      //   <Link to={`/directors/${movie.Director.Name}`}>
      //     <Button variant="link">Director</Button>
      //   </Link>
        
      //   <Link to={`/genres/${movie.Genre.Name}`}>
      //     <Button variant="link">Genre</Button>
      //   </Link>

      // </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
  
};

