import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import "./movie-card.scss"

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className='card' style={{width: '15rem', height: '33rem'}}>
        <Card.Img className='card-img' variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className='card-title'>{movie.Title}</Card.Title>
          {/* <Card.Text className='card-text'>{movie.Description}</Card.Text> */}
          <Link to={`/movies/${movie._id}`}>
            <Button className='open-button' variant="warning" size="sm">Open</Button>
          </Link>
        </Card.Body>
      </Card>
      // <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};