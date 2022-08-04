import React from 'react';
import Container  from 'react-bootstrap/Container';
import ReactDOM from 'react-dom';
import MainView  from './components/main-view/main-view';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

//Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp);

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
            <Container className='body'>
                <MainView />
            </Container>
            </Provider>
        );
    }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);