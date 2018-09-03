import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import beerImg from './res/beer-outline-filled.png'

/**
 * @author Edvard Pires Bjørgen
 *
 * This component renders the inner list element in the current beer, it takes a beer object in as prop.
 * This prop is connected to the "currentBeer"-state in RandomBeerComponent. When the "currentBeer"-state is updated in
 * RandomBeerComponent the currentBeer in this component changes accordingly.
 *
 *
 */

class BeerComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
    }

    /**
     * This renders the inner element of the current
     *
     * @returns {*}
     */
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
