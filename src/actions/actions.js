export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_ADDFAVMOVIE = 'SET_ADDFAVMOVIE';
export const SET_DELFAVMOVIE = 'SET_DELFAVMOVIE';

export function setMovies(value) {
    return { 
        type: SET_MOVIES,
        value
    };
}

export function setFilter(value) {
    return { 
        type: SET_FILTER,
        value
    };
}

export function setUser(value) {
    return {
        type: SET_USER,
        value
    };
}

export function addFavMovie(value) {
    return {
        type: SET_ADDFAVMOVIE,
        value
    };
}

export function delFavMovie(value) {
    return {
        type: SET_DELFAVMOVIE,
        value
    };
}
