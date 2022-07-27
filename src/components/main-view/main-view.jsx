import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView }  from '../navbar-view/navbar-view';
// import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { Row, Col, Container } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://top-movies-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // setSelectedMovie(movie) {
  //   this.setState({
  //     selectedMovie: movie,
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // onRegistration(registered) {
  //   this.setState({
  //     registered,
  //   });
  // }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  render() {
    const { movies, user } = this.state;


    // if (registered) {
    //   return (
    //     <RegistrationView
    //       onRegistration={(register) => this.onRegistration(register)}
    //     />
    //   );
    // }

    // if (!user) return <Row>
    //   <Col>
    //     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    //   </Col>
    // </Row>
    //   return (
    //     <LoginView
    //       onLoggedIn={(user) => this.onLoggedIn(user)}
    //       onRegistration={(register) => this.onRegistration(register)}
    //     />
    //   );
    // }


    // if (movies.length === 0) return <div className="main-view" />;


    
    return (
      <Router>
        <NavbarView user={user} />
        <Container>
        <Row className='main-view justify-content-md-center'>
          <Route exact path="/" render={() => {
            if (!user) return <Col>
            <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />; 
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if(user) return <Redirect to="/"/>
            return <Col lg={8} md={8}>
            <RegistrationView />
            </Col>
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/genres/:name" render={({ match, history}) => {
            if(movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} /> 
          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path={`/users/${user}`} render={({match, history}) => {
            if(!user) return <Redirect to="/" />
            return <Col>
            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path={`/user-update/${user}`} render={({match, history}) => {
            if (!user) return <Redirect to="/" />
            return <Col>
            <UserUpdate user={user} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

        </Row>
        </Container>
      </Router>
      // <div className="main-view">
      //   <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
      //   {selectedMovie
      //     ? (
      //       <Row className="justify-content-md-center">
      //         <Col md={8}>
      //           <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
      //         </Col>
      //       </Row>
      //     )
      //     : (
      //       <Row className="justify-content-md-center">
      //         {movies.map(movie => (
      //           <Col md={3}>
      //             <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
      //           </Col>
      //         ))}
      //       </Row>
      //     )
      //   }
      // </div>
    );
  }
}

export default MainView;