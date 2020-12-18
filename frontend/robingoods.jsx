import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';



document.addEventListener("DOMContentLoaded", () => {
    let store;
    console.log(window.currentUser)
    if (window.currentUser) {
        console.log('here')
        console.log(window.currentUser.user.id)
        console.log(window.currentUser.user)
        console.log(window.currentUser.portfolio.id)
        console.log(window.currentUser.portfolio)
        const preloadedState = {
            entities: {
                user: { [window.currentUser.user.id]: window.currentUser.user },
                portfolio: { [window.currentUser.portfolio.id]: window.currentUser.portfolio }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        console.log(store)
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, root)
})