import React, { Component } from 'react';
import './App.css';

import RandomBeerComponent from "./RandomBeerComponent";

class App extends Component {



    render() {
        return (
            <div className="App">

              <RandomBeerComponent/>
            </div>
        );
    }
}

export default App;
