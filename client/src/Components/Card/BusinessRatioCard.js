import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class BusinessRatioCard extends Component {
  render() {
    return (
      <Card className="data-cards-r1">
        <Card.Content>
          <Icon circular inverted color="blue" name="handshake" size="big" />
          <div className="data-content">
            <p>Business Travel</p>
            <h2>{this.props.businessRatio}%</h2>
            <h2>{this.props.businessTotal} km</h2>
          </div>
          <Card.Content extra></Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

export default BusinessRatioCard;
