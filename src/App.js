import React, { Component } from 'react';
import './App.css';

import beerImg from './res/beer-outline-filled.png'
import BeerComponent from "./BeerComponent";
import MyBeerListComponent from "./MyBeerListComponent";

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentBeer : [],
            myBeerList: [],
            isShowingList: false
        }
    }



    componentDidMount() {
        this.fetchData();

        this.loadDatafromLocalStorage();
    }


    loadDatafromLocalStorage(){
        const savedBeerList = localStorage.getItem("myBeerList");

        if(savedBeerList !== '') {
            this.setState({
                myBeerList: JSON.parse(savedBeerList)
            });
        }


    }


    updateBeer(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            this.fetchData()
        }

    }

    fetchData(){

        this.setState({
            isLoading: true,
            currentBeer : []
        });


        fetch("https://api.punkapi.com/v2/beers/random")
            .then(response => response.json())
            .then(parsedJSON => (this.setState(
                    {
                        currentBeer : parsedJSON,
                        isLoading : false
                    }
                )

            ))

            .catch(error => console.log('parsing failed', error))
    }

    addBeerToList(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            this.addToLocalStorage();
        }

    }

    addToLocalStorage() {
        const currentBeer = this.state.currentBeer;
        let tempBeerList = this.state.myBeerList;

        if(tempBeerList == null) {

            tempBeerList = [];
            tempBeerList.push(currentBeer);
            this.setState(
                {
                    myBeerList: tempBeerList
                });
        } else {
            tempBeerList.push(currentBeer);
            this.setState(
                {
                    myBeerList: tempBeerList
                });
        }

        localStorage.setItem("myBeerList", JSON.stringify(tempBeerList));

    }

    removeAll(evt) {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            this.clearLocalStorage();
        }
    }

    clearLocalStorage(){
        localStorage.setItem("myBeerList", '');
        this.setState(
            {
                myBeerList: []
            });
    }


    showMyList(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {

            if(!this.state.isShowingList) {
                this.setState(
                    {
                        isShowingList: true
                    });

            } else {
                this.setState(
                    {
                        isShowingList: false
                    });
            }

        }

    }


    render() {
        return (
            <div className="App">

                <div className="foam"/>

                <header>
                </header>
                <div className="container flex-align-items-center">
                    <div className="beer-btn fade-in" onClick={evt => this.updateBeer(evt)}>

                        {!this.state.isLoading ? <img src={beerImg} /> : <img className="rotating" src={beerImg} />}

                    </div>
                </div>

                <div className="container flex-align-items-center ">

                    {!this.state.isLoading ? <div className="card fade-in beer-card">
                        <BeerComponent beer={this.state.currentBeer}/>
                        <div className="btn" onClick={evt => this.addBeerToList(evt)}>Add to my beer list</div>
                    </div>: ''}




                </div>

                <div className="fixed-btn" onClick={evt => this.showMyList(evt)}> <h1>{this.state.myBeerList !== null ? this.state.myBeerList.length : 0}</h1></div>

                {this.state.isShowingList ?
                    <div className="dialog-popup fade-in">
                        <div className="card fade-in ">
                            <h2>List of my favorite beer in the world</h2>
                            <MyBeerListComponent beerList={this.state.myBeerList}/>
                            {this.state.myBeerList !== null && this.state.myBeerList.length > 0 ? <div className="btn" onClick={evt => this.removeAll(evt)}>Remove all them beers</div> : ''}

                        </div>
                    </div> : ''}

            </div>
        );
    }
}

export default App;
