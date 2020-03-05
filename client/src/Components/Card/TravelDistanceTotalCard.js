import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class TravelDistanceTotalCard extends Component {
  render() {
    return (
      <Card className="data-cards-r1">
        <Card.Content>
          <Icon circular inverted color="brown" name="road" size="big" />
          <div className="data-content">
            <p>Total Distance</p>
            <h2>{this.props.distanceTotal} km</h2>
            <h2>{this.props.distanceTotalThisYear} km</h2>
          </div>
          <Card.Content extra></Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

export default TravelDistanceTotalCard;
