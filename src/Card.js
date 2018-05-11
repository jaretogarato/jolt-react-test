import React, { Component } from 'react';
import './Card.css';
import { Segment, Header, Grid} from 'semantic-ui-react';


class Card extends Component {
  displayPeople = () => {
    const { name, image, birthYear, homePlanet, i } = this.props;
    let imgSrc = "http"

    return(
      <div className='card'>
        <div className='card-content'>
          <div className='card-name'>
            { name }
          </div>
          {/* <img src='http://localhost:3008/darth_vader.jpg' alt='profile'/> */}
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
      <div>
        { this.displayPeople() }
      </div>
    );
  }
}

export default Card;
