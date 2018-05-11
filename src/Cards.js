import React, { Component } from 'react';
import Card from './Card.js';
import './Card.css';
import { Grid } from 'semantic-ui-react';

class Cards extends Component {
  state = { people: [], planets: [] }

  componentDidMount() {
    this.getPeople(1);

    fetch('http://localhost:3008/planets')
      .then(data => data.json())
      .then((data) => { this.setState({ planets: data }) });
  }

  getPeople = (page) => {
    fetch(`http://localhost:3008/people?page=${page}&_limit=10`)
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

  getCards = () => {
    let cardsPerRow = 3;

    return this.state.people.map( (person, i) => {
      let homePlanetID = person.homeworld;
      let homePlanetName = this.getPlanetName(homePlanetID);
      let count = i % cardsPerRow;

      return(
        // <div key={ i }>
        //   <h1>{count}</h1>
        // { count === 0 ? <Grid.Row columns={{ cardsPerRow }} : "."}
          <Card
            name={ person.name }
            image={ person.image }
            birthYear={ person.birth_year }
            homePlanet={ homePlanetName }
            key={ i }
          >
          </Card>
        // </div>
      )
    })
  }

  render() {
    return(
      <Grid>
        <Grid.Row columns={3}>
          { this.getCards() }
        </Grid.Row>
      </Grid>
    );
  }
}

export default Cards;
