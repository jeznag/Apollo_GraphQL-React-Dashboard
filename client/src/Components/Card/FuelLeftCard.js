import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import FuelEconomyCard from './FuelEconomyCard';

class FuelLeftCard extends Component {
  render() {
    if ((!this.props.lastRefillOdo[0], !this.props.kmsLeft)) {
      return (
        <Card className="data-cards-r1">
          <Card.Content>
            <Icon
              circular
              inverted
              color="orange"
              name="tachometer alternate"
              size="big"
            />
            <div className="data-content">
              <h2>You have no data</h2>
            </div>
            <Card.Content extra>
              <hr></hr>
            </Card.Content>
          </Card.Content>
        </Card>
      );
    } else {
      this.odometer = this.props.currentOdo;
      this.lastRefillOdo = this.props.lastRefillOdo[0].odometerKms;
      this.kmSinceLastRefill = this.odometer - this.lastRefillOdo;
      this.kmSinceLastRefillRounded = Math.floor(this.kmSinceLastRefill);

      const litresLeft = this.props.litresLeft;
      const kmsLeft = this.props.kmsLeft;

      return (
        <Card className="data-cards-r1">
          <Card.Content>
            <Icon
              circular
              inverted
              color="orange"
              name="tachometer alternate"
              size="big"
            />
            <div className="data-content">
              <p>Estimated Fuel Left</p>
              <h2>{kmsLeft.toFixed(1) > 0 ? kmsLeft : '0'} km</h2>
            </div>
            <Card.Content extra>
              <hr></hr>
              <p> {this.kmSinceLastRefillRounded} km (since last fill up) </p>
              <p>
                Litres left since refill:
                {litresLeft.toFixed(2) > 0 ? litresLeft : '0'} L
              </p>
            </Card.Content>
          </Card.Content>
        </Card>
      );
    }
  }
}

export default FuelLeftCard;
