import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import beerImg from './res/beer-outline-filled.png'

/**
 * @author Edvard Pires Bjørgen
 *
 * This component renders the inner list element in the beer list, it takes a list of beers in as prop.
 * This prop is connected to the "myBeerList"-state in RandomBeerComponent. When the "myBeerList"-state is updated in
 * RandomBeerComponent the beerList in this component changes accordingly.
 *
 *
 */

class MyBeerListComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {
        const myBeerList = this.props.beerList;

        return (
            <div className="inner-beer-list">
                {
                    myBeerList !== null && myBeerList.length > 0 ? myBeerList.map(beer =>{
                        const {name, tagline, abv, description, image_url, volume} = beer[0];

                        const MyBeerComp = () => (
                            <div className="inner-beer-list-element">
                                <h3>{name}</h3>
                                <hr/>
                            </div>

                        ); return <MyBeerComp/>

                    }) : ' No beers here :( 🍺'

                }

            </div>
        );
    }
}

export default MyBeerListComponent;
