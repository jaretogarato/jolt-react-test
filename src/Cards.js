import React, { Component } from 'react';
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
    numCards: 0,
    cardsPerPage: 10,
    numPages: 0,
   }

  componentDidMount() {
    this.getNumCardsAndNumPages();
    this.getPeople(1);

    fetch('http://localhost:3008/planets')
      .then( data => data.json() )
      .then( (data) => { this.setState({ planets: data }) } );
  }

  getNumCardsAndNumPages = () => {
    fetch(`http://localhost:3008/people`)
      .then( data => data.json() )
      .then( (data) => {
        this.setState({
          numCards: data.length,
          numPages: Math.ceil(data.length / this.state.cardsPerPage)
        });
      });
  }

  getPeople = (page) => {
    fetch(`http://localhost:3008/people?_page=${page}&_limit=10`)
      .then(data => data.json())
      .then((data) => { this.setState({ people: data }) });
  }

  getPlanetName = (planetID) => {
    if( this.state.planets[planetID] ) {
      return (this.state.planets[planetID].name);
    } else {
      return("unknown");
    }
  }

  displayCards = () => {
    return this.state.people.map( (person, i) => {
      let homePlanetID = person.homeworld;
      let homePlanetName = this.getPlanetName(homePlanetID);

      return(
        <Card
          name={ person.name }
          image={ person.image }
          birthYear={ person.birth_year }
          homePlanet={ homePlanetName }
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
        <SearchBar />
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
