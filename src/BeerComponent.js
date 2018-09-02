import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import beerImg from './res/beer-outline-filled.png'

class BeerComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        const currentBeer = this.props.beer[0];
        const {name, tagline, abv, description, image_url, volume} = currentBeer;

        return (
          <div >
              <h1>{name}</h1>
              <h2>{tagline}</h2>
              <h3>{abv}%</h3>
              <p>{description}</p>
          </div>
        );
    }
}

export default BeerComponent;
