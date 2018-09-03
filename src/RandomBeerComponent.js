import React, { Component } from 'react';
import './App.css';

import beerImg from './res/beer-outline-filled.png'
import BeerComponent from "./BeerComponent";
import MyBeerListComponent from "./MyBeerListComponent";

/**
 * @author Edvard Pires Bjørgen
 *
 * This component has several functions that retrieves and stores data. The data is retrieved from a REST API and
 * the local storage, it also saves data in the local storage. It contains two  different components,
 * which it passes down data to.
 */
class RandomBeerComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentBeer : [],
            myBeerList: [],
            isShowingList: false
        }
    }


/**
 * Function that is called before the render method is executed. It is important to note that setting the state in this phase will not trigger a re-rendering.
 *
 * This case the app starts fetching the random beer from the API before the DOM (Document Object Models) is loaded.
 *
 *
 *
 * For more info on React Component's lifecycle see: https://reactjs.org/docs/react-component.html
 *
 * **/
    componentDidMount() {
        this.fetchData();

        this.loadDatafromLocalStorage();
    }




/**
 * A function for updating the current random beer. When called it takes in a javascript event, checks what type it is and if its position is not equal to zero
 *  *
 * **/
    updateBeer(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            this.fetchData()
        }

    }
/**
 * Button function for adding the current beer to local storage
 *
 * **/
    addBeerToList(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            this.addToLocalStorage();
        }

    }

/**
 * Button function for clearing the local storage
 *
 * **/
    removeAll(evt) {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            this.clearLocalStorage();
        }
    }


    /**
     * Button function for opening the beer list popup
     * It sets the state "isShowingList" to either true or false, based on its current truth/false value. This allows the React later to render/display the popup message based
     * on the "isShowingList"-state
     *
     * **/
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


    /**
     * A function for retrieving data from a REST API
     *
     * First it sets the "isLoading"-state to true and clears out the currentBeer
     *
     * Next, it starts the fetch()-function. Fetch is a web API that easily allows network request in Javascript
     * More info about the Fetch Web API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
     *
     * It sends a request to the REST API, if the request is successful, it then receives a response. The response is then parsed to JSON.
     * We then know that this parsed JSON object is the beer object we want, so we can assign the "currentBeer"-state directly to the parsed JSON.
     * Also, we've successfully received the random beer object from the REST API, we can then set the "isLoading"-state to false.
     *
     * At last, if an error is received, its caught and printed out ito the console.
     *
     * **/
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

    /**
     * This function retrieves data from the Local Storage of the we browser, for more info: https://www.w3schools.com/jsref/prop_win_localstorage.asp
     * Here, the saved beer list is retrieved from the local storage. If it is not an empty string it will then be set as the "myBeerList"-state
     *
     *
     **/
    loadDatafromLocalStorage(){
        const savedBeerList = localStorage.getItem("myBeerList");

        if(savedBeerList !== '') {
            this.setState({
                myBeerList: JSON.parse(savedBeerList)
            });
        }


    }

    /**
     * This funcion adds the currentBeer to the local storage
     *
     * First we instantiate a new object from the "currentBeer"-state, and then we do the same with the beer list,
     * this is only a temporary variable, its not used outside the function.
     *
     * We then check the temporary beer list if its empty, remember this is a full copy of the "myBeerList"-state,
     * so in theory we're checking if the "myBeerList"-state is null. If it is null, this means that we have to create an empty
     * array object, push the "currentBeer"-object into it and set it as the "myBeerList"-state.
     *
     * If we dont do set it as an empty array objece, it will be a null, and the .push()-function we perform afterwards
     * will send out an error.
     *
     * If the tempBeerList is not null push the "currentBeer"-object into the tempBeerList and set it as the "myBeerList"-state
     *
     *
     * **/
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


    /**
     * This function sets the "myBeerList" object in local storage to an empty string
     *
     *
     */
    clearLocalStorage(){
        localStorage.setItem("myBeerList", '');
        this.setState(
            {
                myBeerList: []
            });
    }


    /**
     * For info on the render()-function, see https://reactjs.org/docs/react-component.html#render
     *
     * @returns {a single div }
     */
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
                            <div className="btn" onClick={evt => this.showMyList(evt)}>Close the list</div>

                        </div>
                    </div> : ''}

            </div>
        );
    }
}

export default RandomBeerComponent;
