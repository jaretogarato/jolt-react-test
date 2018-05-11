import React, { Component } from 'react';
import Card from './Card.js';
import './Card.css';
import { Segment, Grid} from 'semantic-ui-react';


class Cards extends Component {
  state = { people: [], planets: [] }

  componentDidMount() {
    fetch('http://localhost:3008/people')
      .then(data => data.json())
      .then((data) => { this.setState({ people: data }) });

      fetch('http://localhost:3008/planets')
        .then(data => data.json())
        .then((data) => { this.setState({ planets: data }) });
  }

  getPlanetName = (planetID) => {
    if( this.state.planets[planetID] ) {
      return (this.state.planets[planetID].name);
    } else {
      return("unknown");
    }
  }

  getCards = () => {
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
        >
        </Card>
      )
    })
  }

  render() {
    return(
      <Segment basic>
        <Grid>
          <Grid.Row>
            { this.getCards() }
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Cards;
