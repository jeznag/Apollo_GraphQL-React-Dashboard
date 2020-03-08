import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class TravelDistanceTotalCard extends Component {
  render() {
    return (
      <Card className="data-cards-r1">
        <Card.Content>
          <Icon circular inverted color="brown" name="road" size="big" />
          <div className="data-content">
            <span>Overall Total Driven<h3>{this.props.distanceTotal} km</h3> </span>
            <span>Total Driven This Year<h3>{this.props.distanceTotalThisYear} km</h3> </span>
          </div>
          <Card.Content extra></Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

export default TravelDistanceTotalCard;
