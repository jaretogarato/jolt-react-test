import React from 'react';
import { Grid, Button, Icon, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const NoClick = styled(Button)`
  cursor: default !important;
`

class PagesControl extends React.Component {
  state = { activePage: 1 }

  goToPage = (activePage) => {
    this.setState({ activePage }, () => {
      this.props.paginate(this.state.activePage);
    })
  }

  render() {
    let { numPages } = this.props;
    let { activePage } = this.state;
    let canPrev = {};
    let canNext = {};
    canPrev.disabled = activePage === 1
    canNext.disabled = activePage === numPages

    return (
      <Segment inverted color='yellow'>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={3}>
              <Segment inverted color='yellow' floated='left'>
                <Button
                  basic
                  color='black'
                  {...canPrev}
                  onClick={() => this.goToPage (activePage - 1) }
                >
                  <Icon name='chevron left' />
                  Prev
                </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment inverted color='yellow' align='center'>
                {activePage !== 1 && <Button color='black' basic onClick={ () => this.goToPage(1) }>{1}</Button>}

                {activePage > 3 && numPages > 4 && <Button color='black' disabled>...</Button>}

                {activePage === numPages > 3 && <Button color='black' basic onClick={ () => this.goToPage(numPages - 2) }>{numPages - 2}</Button>}

                {activePage > 2 && <Button color='black' basic onClick={ () => this.goToPage(activePage - 1) }>{activePage - 1}</Button>}

                <NoClick>{activePage}</NoClick>

                {activePage < numPages && <Button color='black' basic onClick={ () => this.goToPage(activePage + 1) }>{activePage + 1}</Button>}

                {activePage === 1 && numPages > 2 && <Button color='black' basic onClick={ () => this.goToPage(activePage + 2) }>{3}</Button>}

                {numPages - 2 > activePage && numPages > 4 && <Button color='black' disabled>...</Button>}

                {numPages - 1 > activePage && numPages > 3 && <Button color='black' basic onClick={ () => this.goToPage(numPages) }>{numPages}</Button>}
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
              <Segment inverted color='yellow' floated='right'>
                <Button color='black' basic {...canNext} onClick={() => this.goToPage(activePage + 1)}>Next<Icon name='chevron right' /></Button>
              </Segment>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default PagesControl;
