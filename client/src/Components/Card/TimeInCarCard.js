import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class TimeInCarCard extends Component {
  render() {
    return (
      <Card className="data-cards-r1">
        <Card.Content>
          <Icon circular inverted color="grey" name="car" size="big" />
          <div className="data-content">
            <p>Time in Car (this year)</p>
            <h2>{this.props.timeInCar} Hours</h2>
          </div>
          <Card.Content extra></Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

export default TimeInCarCard;
