import React, { Component } from 'react';
import './Card.css';
import { Grid } from 'semantic-ui-react';

class Card extends Component {

  displayPeople = () => {
    const { name, image, birthYear, homePlanet} = this.props;
    return(
      <div className='card'>
        <div className='card-content'>
          <div className='card-name'>
            { name }
          </div>
          <img src={ "http://localhost:3008/" + image } alt='profile' />
          <p>
            <span>Birthday:</span>
            <span>{ birthYear }</span>
          </p>
          <p>
            <span>Homeworld:</span>
            <span>{ homePlanet }</span>
          </p>
        </div>
      </div>
    )
  }

  render() {
    return(
      <Grid.Column>
        { this.displayPeople() }
      </Grid.Column>
    );
  }
}

export default Card;
