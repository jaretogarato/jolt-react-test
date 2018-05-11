import React, { Component } from 'react';
import './Card.css';
import { Segment, Header, Grid} from 'semantic-ui-react';


class Card extends Component {
  state = { people: [], planets: [] }

  componentDidMount() {
    fetch('http://localhost:3008/people')
      .then(data => data.json())
      .then((data) => { this.setState({ people: data }) });

      fetch('http://localhost:3008/planets')
        .then(data => data.json())
        .then((data) => { this.setState({ planets: data }) });
  }

  displayPeople = () => {
    return this.state.people.map( (person, i) => {
      let homePlanetID = person.homeworld;
      let homePlanet = this.state.planets.homePlanetID;
      return(
        <Grid.Column width={4} key={i}>
          <Segment>
            <Header as='h1'>
              Name: {person.name}
              <br />
              Image: {person.image}
              <br />
              Birthday: {person.birth_year}
              <br />
              Home Planet ID: {homePlanetID}
              <br />
              Home Planet: {homePlanet}
              <hr />
            </Header>
          </Segment>
        </Grid.Column>
      )
    })
  }

  render() {
    return(
      <div>
        <div className='card'>
          <div className='card-content'>
            <div className='card-name'>Darth Vader
            </div>
          	<img src='http://localhost:3008/darth_vader.jpg' alt='profile'/>
            <p>
              <span>Birthday:</span>
              <span>41.9BBY</span>
            </p>
            <p>
              {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
              <span>Homeworld:</span>
              <span>Tatooine</span>
            </p>
          </div>
        </div>

        <Segment basic>
          <Grid>
            <Grid.Row>
              { this.displayPeople() }
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default Card;
