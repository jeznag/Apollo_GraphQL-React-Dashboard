import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class DiagnosticCard extends Component {
  render() {
    if (
      this.props.diagnosticIssue[0] === undefined ||
      this.props.diagnosticIssue[0] === null
    ) {
      return (
        <Card className="data-cards-r1">
          <Card.Content>
            <Icon circular inverted color="red" name="wrench" size="big" />
            <div className="data-content">
              <p>Diagnostic Issues</p>
              <h2>No Data</h2>
            </div>
            <Card.Content extra>
              <hr></hr>
              <a href="/#">{this.props.diagnosticDetail}</a>
            </Card.Content>
          </Card.Content>
        </Card>
      );
    } else {
      return (
        <Card className="data-cards-r1">
          <Card.Content>
            <Icon circular inverted color="red" name="wrench" size="big" />
            <div className="data-content">
              <p>Diagnostic Issues</p>
              <h2>{this.props.diagnosticIssue[0].code}</h2>
            </div>
            <Card.Content extra>
              <hr></hr>
              <a href="/#">{this.props.diagnosticDetail}</a>
            </Card.Content>
          </Card.Content>
        </Card>
      );
    }
  }
}

export default DiagnosticCard;
