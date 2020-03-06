import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import { Header, Icon, Segment } from 'semantic-ui-react';

class SimpleMap extends Component {
  render() {
    // trip end and start location
    const tripPoints = this.props.trips
      .map(trip => {
        const tripStart = trip.startLocation;
        const tripEnd = trip.endLocation;

        return {
          locations: [tripStart?.geoPoint, tripEnd?.geoPoint],
          numberOfEvents: parseFloat(trip.numberOfEvents) / trip.distance,
        };
      })
      .filter(tripData => {
        const [startLocation, endLocation] = tripData.locations;
        return startLocation && endLocation;
      });

    // centers the map to last location
    const initialCenter = this.props.trips
      .map(trip => {
        const center = trip.endLocation;
        return center?.geoPoint;
      })
      .filter(endLocation => {
        return endLocation;
      });

    // using number of events and color coding them based on distance traveled and number of events
    // const numberEvents = this.props.trips.map(trip => {
    //   const events = trip.numberOfEvents;
    //   return events;
    // });

    // gforce color
    const getGforceColor = numberEvents => {
      const color = ['red', 'orange', 'green'];
      if (numberEvents > 15) {
        return color[0];
      } else if (numberEvents > 5) {
        return color[1];
      } else if (numberEvents < 5) {
        return color[2];
      }
    };

    return (
      <Segment style={{ width: '85%' }}>
        <Header icon>Trips</Header>
        <div
          className="ui embed"
          style={{ maxWidth: '100vw', paddingBottom: '45%' }}
        >
          <Map
            google={this.props.google}
            zoom={11}
            className={'map'}
            initialCenter={initialCenter[initialCenter.length - 1]}
          >
            {tripPoints.map(tripData => {
              return (
                <Polyline
                  path={tripData.locations}
                  strokeColor={getGforceColor(tripData.numberOfEvents)}
                  strokeOpacity={0.5}
                  strokeWeight={2}
                />
              );
            })}
          </Map>
        </div>
      </Segment>
    );
  }
}

// NB Google Maps API key is not secret. It's fine to have it in clear text
// because we whitelist URLs from the google maps console
// If someone tries to use our key, they won't be able to use it anywhere except localhost
export default GoogleApiWrapper({
  apiKey: `AIzaSyB05HDuP6Jvdsy8jUcnvvkrW-Qq0Uluoyw`,
})(SimpleMap);
