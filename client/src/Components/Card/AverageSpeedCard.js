import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class AverageSpeedCard extends Component {
  render() {
    return (
      <Card className="data-cards-r1">
        <Card.Content>
          <Icon
            circular
            inverted
            color="yellow"
            name="shipping fast"
            size="big"
          />
          <div className="data-content">
            <p>Average Speed</p>
            <h2>{this.props.speed} km/hr</h2>
          </div>
          <Card.Content extra></Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

export default AverageSpeedCard;
