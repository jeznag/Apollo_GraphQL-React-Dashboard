import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class FuelEconomyCard extends Component {
  render() {
    const averagePer100Km = this.props.averagePer100Km;
    return (
      <Card className="data-cards-r1">
        <Card.Content>
          <Icon
            circular
            inverted
            color="violet"
            name="dollar sign"
            size="big"
          />
          <div className="data-content">
            <p>Fuel Economy</p>
            <h2>{averagePer100Km.toFixed(1)}/100km</h2>
          </div>
          <Card.Content extra></Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

export default FuelEconomyCard;
