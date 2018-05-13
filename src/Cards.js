import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card.js';
import './Card.css';
import { Grid } from 'semantic-ui-react';
import SearchBar from "./SearchBar.js"
import star from './images/star.svg';
import wars from './images/wars.svg';
import PagesControl from './PagesControl.js';

class Cards extends Component {
  state = {
    people: [],
    planets: [],
    cards: [], // master, load once, people + planets
    numCards: 0,
    cardsPerPage: 10,
    numPages: 0,
    anySearchResults: false,
    searchResults: [],
   }

  componentDidMount() {
    // this.getNumCardsAndNumPages();
    // this.getPeople(1);

    axios.get('http://localhost:3008/people')
      .catch( err => console.log('Error retrieving people: ', err ))
      .then( res => {
        this.setState({ people: res.data });
        // console.log(res.data);
        axios.get('http://localhost:3008/planets')
          .catch( err => console.log('Error retrieving planets: ', err ))
          .then( res => {
            this.setState({ planets: res.data });
            // console.log(res.data);
            this.makeCards();
        });
    });
  }

  getHomeworldName = (homeworldID) => {
    if( this.state.planets[homeworldID] ) {
      return (this.state.planets[homeworldID].name);
    } else {
      return("unknown");
    }
  }

  makeCards = () => {
    console.log('makeCards called');
    console.log(this.state.people);

    this.state.people.map( (person, i) => {
      let homeworldID = person.homeworld;
      let homeworldName = this.getHomeworldName(homeworldID);
      let card = {
        id: person.id,
        name: person.name,
        image: person.image,
        birthYear: person.birth_year,
        homeworld: homeworldName
      }

      this.setState({ cards: [...this.state.cards, card]})
    })
    console.log(this.state.cards);
  }

  getNumCardsAndNumPages = () => {
    if( this.state.anySearchResults ){
      console.log('* we have search results');
      this.setState({
        numCards: this.state.searchResults.length,
        numPages: Math.ceil(this.state.searchResults.length / this.state.cardsPerPage)
      });
    } else {
      console.log('* there are NO search results');
      fetch(`http://localhost:3008/people`)
        .then( data => data.json() )
        .then( (data) => {
          this.setState({
            numCards: data.length,
            numPages: Math.ceil(data.length / this.state.cardsPerPage)
          });
      });
    }
  }

  setSearchResults = (data) => {
    this.setState({ searchResults: data });
    this.state.searchResults.length ?
      this.setState({anySearchResults: true}) :
      this.setState({anySearchResults: false});
    this.getNumCardsAndNumPages();
    this.getPeople(1);

    // console.log('--------------------------');
    // console.log('setSearchResults called!');
    // console.log('Cards state: ');
    // console.log(this.state);
    // console.log("this.state.people: ")
    // console.log(this.state.people);
    // console.log("this.state.searchResults: ");
    // console.log(this.state.searchResults);
  }

  getPeople = (page) => {
    if( this.state.anySearchResults ) {
      this.setState({ people: this.state.searchResults });
    } else {
      fetch(`http://localhost:3008/people?_page=${page}&_limit=10`)
        .then( data => data.json() )
        .then( (data) => { this.setState({ people: data }) });
    }
  }

  displayCards = () => {
    return this.state.people.map( (person, i) => {
      let homeworldID = person.homeworld;
      let homeworldName = this.getHomeworldName(homeworldID);

      return(
        <Card
          name={ person.name }
          image={ person.image }
          birthYear={ person.birth_year }
          homeworld={ homeworldName }
          key={ i }
        />
      )
    })
  }

  handlePageClick = (page) => {
    this.setState({ loading: true }, () => {
      this.getPeople(page);
    });
  }

  render() {
    return(
      <div>
        <PagesControl
          paginate={this.handlePageClick}
          numPages={this.state.numPages}
        />
        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='interview-text'>The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>
        <SearchBar setSearchResults={this.setSearchResults}/>
        <Grid>
          <Grid.Row columns={3}>
            { this.displayCards() }
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Cards;
