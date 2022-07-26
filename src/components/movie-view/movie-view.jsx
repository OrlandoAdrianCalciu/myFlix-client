import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  keypressCallback(event){
    console.log(event.key);
  }

  componentDidMount(){
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount(){
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
          <Card className='movie-view'>
            <Card.Body>
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