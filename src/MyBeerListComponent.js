import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import beerImg from './res/beer-outline-filled.png'

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
