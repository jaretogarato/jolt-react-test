import React, { Component } from 'react';
import { Input, Grid } from 'semantic-ui-react';
import './SearchBar.css';

class SearchBar extends Component {
  state = { people: [], visible: [], search: '' }

  handleChange = (e) => {
    this.setState({ search: e.target.value }, () => {
      this.updateVisible();
      console.log('change');
    });
  }

  updateVisible = () => {
    let { search, people } = this.state;
    let { setSearchResults } = this.props;

    if (search.length === 0) {
      this.setState({ visible: people })
    } else if (search.length > 3) {
      fetch(`http://localhost:3008/people?q=${search}`)
        .then( data => data.json() )
        .then( (data) => {
          this.setState({ visible: data });
          setSearchResults( data );
      });
    } else {
      this.setState({ visible: [] });
      setSearchResults( [] );
    }
  }

  render() {
    return (
      <div className='search-bar'>
        <Grid>
          <Grid.Row columns='equal'>
            <Grid.Column />
            <Grid.Column>
              <Input
                value={this.state.search}
                onChange={this.handleChange}
                icon={{ name: 'search', circular: true }}
                placeholder='Search Your Destiny'
              />
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default SearchBar;
