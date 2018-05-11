import React, { Component } from 'react';
import './Card.css';
import { Segment, Header, Grid} from 'semantic-ui-react';


class Card extends Component {
  state = { people: [] }

  componentDidMount() {
    fetch('http://localhost:3008/people')
      .then(data => data.json())
      .then((data) => { this.setState({ people: data }) });
  }

  displayPeople = () => {
    return this.state.people.map( person => {
      return(
        <Grid.Column width={4}>
          <Segment>
            <Header as='h1'>
              Name: {person.name}
              <br />
              Image: {person.image}
              <br />
              Birthday: {person.birthyear}
              <br />
              Home Planet ID: {person.homeworld}
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
