import { combineReducers } from "redux";

import { SET_ADDFAVMOVIE, SET_DELFAVMOVIE, SET_FILTER, SET_MOVIES, SET_USER } from "../actions/actions";

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
            default:
                return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
            default:
                return state;
    }
}

function user(state = '', action) {
    switch (action.type){
        case SET_USER:
            return action.value || localStorage.getItem('user');
            default: 
            return state;
    }
}

function favMovie(state = '', action) {
    switch (action.type){
        case SET_ADDFAVMOVIE:
            return action.value;
        case SET_DELFAVMOVIE:
            return action.value;
            default: 
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user,
    favMovie
  });

export default moviesApp;