import React from 'react';
import ReactDOM from 'react-dom';

// need to import configureStore and Root component, then render root

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("root");
    ReactDOM.render(<div>Welcome to Shavasana!</div>, root);
    // render Root component when it's ready!
});