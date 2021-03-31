import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';



document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                user: { [window.currentUser.user.id]: window.currentUser.user }
            },
            session: { id: window.currentUser.user.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, root)
})