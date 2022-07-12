import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Life', Description: 'A team of scientists aboard the International Space Station discover a rapidly evolving life from that caused extinction on Mars and now threatens all life on Earth.', ImagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL8hcAOmSG7nJVmkhrnqlaDThH5r0Zj1R4j6kzDx2BXhvVXETI' },
                { _id: 2, Title: 'The Mummy', Description: 'An ancient Egyptian princess is awakened from her crypt beneath the desert, bringing with her malevolence grown over millennia, and terrors that defy human comprehension.', ImagePath: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTCXgCV-ZNb3InBCTaLdED58dF6iZJxIvCOBurktiWxXrwGc8DB' },
                { _id: 3, Title: 'Gifted', Description: 'Frank, a single man raising his child prodigy niece Mary, is drawn into a custody battle with his mother.', ImagePath: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSE8rmFQdCRPL8OpCknQJ2ScEcXqf39eOi9w-KIhPpb7aSUrdS3' }
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;
      
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
}