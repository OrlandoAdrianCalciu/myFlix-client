import React from "react";
import PropTypes from 'prop-types';
import {Card, Col, Container, Row, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export class GenreView extends React.Component {

    render() {
        const {genre, onBackClick} = this.props;

        return(
        <Card bg="secondary" border="light" text="dark" className="text-center">
        <Card.Header>{genre.Name}</Card.Header>
        <Card.Body>
          <Card.Text>{genre.Description}</Card.Text>
          <Button variant="outline-danger" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
        )
    }
}